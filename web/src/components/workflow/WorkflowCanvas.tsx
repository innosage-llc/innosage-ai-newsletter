'use client';

import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import FetchNode from './FetchNode';
import AiSummarizeNode from './AiSummarizeNode';

const nodeTypes = {
  fetchRss: FetchNode,
  aiSummarize: AiSummarizeNode,
};

const initialNodes: Node[] = [
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
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

export default function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="h-[calc(100vh-4rem)] w-full border border-gray-200 rounded-lg overflow-hidden bg-slate-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}