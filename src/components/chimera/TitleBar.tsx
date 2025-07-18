"use client";

import { Minus, X } from "lucide-react";
import { Button } from "../ui/button";

type TitleBarProps = {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClose: () => void;
};

export function TitleBar({ onMouseDown, onClose }: TitleBarProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="flex h-10 cursor-move items-center justify-between rounded-t-lg bg-slate-800/20 backdrop-blur-sm border-b border-slate-700/30 px-3 text-sm font-medium text-slate-100"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-pulse-slow rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span style={{ textShadow: '0 0 5px rgba(0,0,0,0.7)' }}>Chip</span>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-slate-400 hover:bg-slate-700/80 hover:text-white"
          aria-label="Minimize"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-slate-400 hover:bg-red-500/80 hover:text-white"
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
