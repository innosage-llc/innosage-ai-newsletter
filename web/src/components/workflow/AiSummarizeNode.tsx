import { Handle, Position } from '@xyflow/react';
import { Bot } from 'lucide-react';

function AiSummarizeNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-indigo-200 w-48 text-black">
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-slate-400" />
      <div className="flex items-center gap-2 mb-2">
        <Bot size={16} className="text-indigo-500" />
        <div className="font-bold text-sm">AI Summarize</div>
      </div>
      <div className="text-xs text-gray-500">{data.label}</div>
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-slate-400" />
    </div>
  );
}

export default AiSummarizeNode;