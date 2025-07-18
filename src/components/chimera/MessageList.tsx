"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/lib/types";
import { MessageItem } from "./MessageItem";
import { TypingIndicator } from "./TypingIndicator";
import { motion } from "framer-motion";

type MessageListProps = {
  messages: ChatMessage[];
  isTyping: boolean;
};

export function MessageList({ messages, isTyping }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={scrollAreaRef}
      className="flex-1 space-y-4 overflow-y-auto p-4"
    >
      {messages.map((msg, index) => (
        <motion.div
          key={msg.id}
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <MessageItem message={msg} />
        </motion.div>
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
