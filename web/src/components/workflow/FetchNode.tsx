import { Handle, Position, NodeProps } from '@xyflow/react';
import { Rss } from 'lucide-react';

type FetchNodeData = {
  label: string;
};

function FetchNode({ data }: NodeProps) {
  const nodeData = data as FetchNodeData;
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-background border-2 border-border w-48 text-foreground">
      <div className="flex items-center gap-2 mb-2">
        <Rss size={16} className="text-accent" />
        <div className="font-bold text-sm">Fetch RSS</div>
      </div>
      <div className="text-xs text-muted-foreground">{nodeData.label}</div>
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-muted-foreground" />
    </div>
  );
}

export default FetchNode;