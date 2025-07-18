"use client";

import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";
import { AIAvatar } from "./AIAvatar";

type MessageItemProps = {
  message: ChatMessage;
};

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.author === "user";

  return (
    <div
      className={cn(
        "flex w-full items-end gap-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && <AIAvatar className="shrink-0" />}
      <div
        className={cn(
          "max-w-md rounded-lg p-3 text-slate-100",
          isUser ? "bg-primary/80" : "bg-slate-900/50"
        )}
      >
        <p className="font-code text-sm leading-relaxed" style={{ textShadow: '0 0 5px rgba(0,0,0,0.7)' }}>{message.text}</p>
      </div>
    </div>
  );
}
