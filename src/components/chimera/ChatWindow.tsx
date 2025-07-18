"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";
import { TitleBar } from "./TitleBar";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { askAI } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

type ChatWindowProps = {
  onClose: () => void;
  opacity: number;
  onOpacityChange: (value: number) => void;
};

export default function ChatWindow({ onClose, opacity, onOpacityChange }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      author: "ai",
      text: "Hey! I'm Chip, your AI gaming companion. How can I help you strategize?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, [role="dialog"], input')) {
      return; 
    }
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      author: "user",
      text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const aiMessage = await askAI(text);
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not get a response from the AI.",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div
      ref={windowRef}
      className={cn(
        "relative flex h-[600px] max-h-[80vh] w-[400px] max-w-[90vw] flex-col overflow-hidden rounded-lg border border-slate-200/20 text-card-foreground shadow-lg shadow-primary/20",
        isDragging && "cursor-grabbing"
      )}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
       } as React.CSSProperties}
    >
      <TitleBar onMouseDown={handleMouseDown} onClose={onClose} />
      <MessageList messages={messages} isTyping={isTyping} />
      <ChatInput onSubmit={handleSendMessage} disabled={isTyping} />
    </div>
  );
}
