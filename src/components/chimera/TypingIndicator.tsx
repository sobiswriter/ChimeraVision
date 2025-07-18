import { AIAvatar } from "./AIAvatar";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 p-3 animate-in fade-in slide-in-from-bottom-4 duration-200 ease-out">
      <AIAvatar />
      <div className="flex items-center space-x-1.5 rounded-lg bg-slate-700 p-3">
        <span className="h-2 w-2 animate-pulse-dot rounded-full bg-slate-400 [animation-delay:0s]" />
        <span className="h-2 w-2 animate-pulse-dot rounded-full bg-slate-400 [animation-delay:0.2s]" />
        <span className="h-2 w-2 animate-pulse-dot rounded-full bg-slate-400 [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
