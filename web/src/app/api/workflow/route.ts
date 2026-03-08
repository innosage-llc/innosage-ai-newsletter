import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

const dataDir = path.join(process.cwd(), 'data');
const stateFilePath = path.join(dataDir, 'workflow.json');

// Ensure the data directory and file exist
async function ensureDataFile() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  try {
    await fs.access(stateFilePath);
  } catch {
    const initialState = {
      nodes: [
        {
          id: '1',
          type: 'fetchRss',
          position: { x: 100, y: 100 },
          data: { label: 'Fetch from Sources' },
        },
        {
          id: '2',
          type: 'aiSummarize',
          position: { x: 400, y: 100 },
          data: { label: 'Summarize with Stable Tone' },
        },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
      ],
    };
    await fs.writeFile(stateFilePath, JSON.stringify(initialState, null, 2), 'utf8');
  }
}

export async function GET() {
  try {
    await ensureDataFile();
    const data = await fs.readFile(stateFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading workflow state:', error);
    return NextResponse.json({ error: 'Failed to read workflow state' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, type, label } = body;

    if (action === 'addNode') {
      if (!type || !label) {
        return NextResponse.json({ error: 'Type and label are required for addNode' }, { status: 400 });
      }

      await ensureDataFile();
      const stateData = await fs.readFile(stateFilePath, 'utf8');
      const state = JSON.parse(stateData);

      // Create new node
      const newNodeId = crypto.randomUUID();

      // Calculate a rough position based on the number of existing nodes
      const existingNodesOfType = state.nodes.filter((n: { type: string }) => n.type === type);
      const baseX = type === 'fetchRss' ? 100 : 400;
      const newY = 100 + ((existingNodesOfType.length + 1) * 100);

      const newNode = {
        id: newNodeId,
        type: type,
        position: { x: baseX, y: newY },
        data: { label: label },
      };

      state.nodes.push(newNode);

      await fs.writeFile(stateFilePath, JSON.stringify(state, null, 2), 'utf8');

      return NextResponse.json({ success: true, node: newNode });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Error modifying workflow state:', error);
    return NextResponse.json({ error: 'Failed to modify workflow state' }, { status: 500 });
  }
}
