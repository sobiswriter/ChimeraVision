"use client";

import { cn } from "@/lib/utils";
import { AIAvatar } from "./AIAvatar";

type LauncherIconProps = {
  onOpen: () => void;
  className?: string;
};

export function LauncherIcon({ onOpen, className }: LauncherIconProps) {
  return (
    <button
      onClick={onOpen}
      className={cn(
        "z-10 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 transition-all duration-300 ease-in-out hover:bg-slate-700/50 hover:shadow-lg hover:shadow-primary/30",
        className
      )}
      aria-label="Open Chat"
    >
      <AIAvatar className="h-10 w-10 bg-transparent" />
    </button>
  );
}
