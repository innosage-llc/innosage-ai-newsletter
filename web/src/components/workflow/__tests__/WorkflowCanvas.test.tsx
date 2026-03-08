import { render, screen } from '@testing-library/react';
import WorkflowCanvas from '@/components/workflow/WorkflowCanvas';

// Mock ResizeObserver for React Flow
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe('WorkflowCanvas Component', () => {
  it('renders without crashing and displays the nodes', () => {
    // Need to wrap in a container with height for React Flow to render properly
    render(
      <div style={{ width: 500, height: 500 }}>
        <WorkflowCanvas />
      </div>
    );

    // Check if the Fetch RSS node is rendered
    expect(screen.getByText('Fetch from Sources')).toBeInTheDocument();
    expect(screen.getByText('Fetch RSS')).toBeInTheDocument();

    // Check if the AI Summarize node is rendered
    expect(screen.getByText('Summarize with Stable Tone')).toBeInTheDocument();
    expect(screen.getByText('AI Summarize')).toBeInTheDocument();
  });
});
