"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/lib/types";
import { MessageItem } from "./MessageItem";
import { TypingIndicator } from "./TypingIndicator";
import { motion, AnimatePresence } from "framer-motion";

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
      className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden p-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/30"
    >
      <AnimatePresence>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            layout
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <MessageItem message={msg} />
          </motion.div>
        ))}
      </AnimatePresence>
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
