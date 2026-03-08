import { Handle, Position, NodeProps } from '@xyflow/react';
import { Bot } from 'lucide-react';

type AiSummarizeNodeData = {
  label: string;
};

function AiSummarizeNode({ data }: NodeProps) {
  const nodeData = data as AiSummarizeNodeData;
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-background border-2 border-primary/20 w-48 text-foreground">
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-muted-foreground" />
      <div className="flex items-center gap-2 mb-2">
        <Bot size={16} className="text-primary" />
        <div className="font-bold text-sm">AI Summarize</div>
      </div>
      <div className="text-xs text-muted-foreground">{nodeData.label}</div>
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-muted-foreground" />
    </div>
  );
}

export default AiSummarizeNode;