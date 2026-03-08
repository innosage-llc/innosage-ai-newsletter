import { Handle, Position } from '@xyflow/react';
import { Rss } from 'lucide-react';

function FetchNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-slate-200 w-48 text-black">
      <div className="flex items-center gap-2 mb-2">
        <Rss size={16} className="text-orange-500" />
        <div className="font-bold text-sm">Fetch RSS</div>
      </div>
      <div className="text-xs text-gray-500">{data.label}</div>
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-slate-400" />
    </div>
  );
}

export default FetchNode;