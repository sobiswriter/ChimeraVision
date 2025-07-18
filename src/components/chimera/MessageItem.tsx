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
          isUser ? "bg-primary" : "bg-slate-700"
        )}
      >
        <p className="font-code text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}
