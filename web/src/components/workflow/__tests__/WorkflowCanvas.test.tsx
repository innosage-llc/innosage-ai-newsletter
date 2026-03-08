import { render, screen, waitFor } from '@testing-library/react';
import WorkflowCanvas from '@/components/workflow/WorkflowCanvas';

describe('WorkflowCanvas Component', () => {
  beforeEach(() => {
    // Mock the global fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
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
          edges: [],
        }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing and displays the nodes after fetching', async () => {
    // Need to wrap in a container with height for React Flow to render properly
    render(
      <div style={{ width: 500, height: 500 }}>
        <WorkflowCanvas />
      </div>
    );

    // Wait for the async fetch to complete and nodes to be rendered
    await waitFor(() => {
      // Check if the Fetch RSS node is rendered
      expect(screen.getByText('Fetch from Sources')).toBeInTheDocument();
      expect(screen.getByText('Fetch RSS')).toBeInTheDocument();

      // Check if the AI Summarize node is rendered
      expect(screen.getByText('Summarize with Stable Tone')).toBeInTheDocument();
      expect(screen.getByText('AI Summarize')).toBeInTheDocument();
    });
  });
});
