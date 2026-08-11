import { X, Minus, Maximize2 } from "lucide-react";

export const MacControls = ({ onClose }) => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer py-1">
      {/* Red Close Traffic Light */}
      <button
        onClick={onClose}
        className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        title="Close (ESC)"
        aria-label="Close modal window"
      >
        <X className="h-2 w-2 text-black/80 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
      </button>

      {/* Yellow Minimize Traffic Light */}
      <button
        className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-transform hover:scale-110 cursor-default"
        title="Minimize"
        aria-label="Minimize modal window"
      >
        <Minus className="h-2 w-2 text-black/80 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
      </button>

      {/* Green Expand Traffic Light */}
      <button
        className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#27c93f] border border-[#1aab29] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-transform hover:scale-110 cursor-default"
        title="Expand"
        aria-label="Expand modal window"
      >
        <Maximize2 className="h-2 w-2 text-black/80 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
      </button>
    </div>
  );
};

export default MacControls;
