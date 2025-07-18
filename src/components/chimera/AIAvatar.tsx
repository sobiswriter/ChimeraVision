import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

type AIAvatarProps = {
  className?: string;
};

export function AIAvatar({ className }: AIAvatarProps) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-slate-100",
        className
      )}
    >
      <Bot className="h-5 w-5" />
    </div>
  );
}
