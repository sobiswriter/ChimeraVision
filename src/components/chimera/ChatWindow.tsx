"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";
import { TitleBar } from "./TitleBar";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { useToast } from "@/hooks/use-toast";
import { chimeraApi } from "@/lib/chimera-api";

type ChatWindowProps = {
  onClose: () => void;
  opacity: number;
  onOpacityChange: (opacity: number) => void;
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

  useEffect(() => {
    const handleNewMessage = (message: ChatMessage) => {
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Set up the listener using the handler function.
    const unsubscribe = chimeraApi.onNewMessage(handleNewMessage);

    // Return a cleanup function to remove the listener.
    return () => {
      unsubscribe();
    };
  }, []);


  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, [role="dialog"], input, [role="slider"]')) {
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
    // Add user message instantly for responsiveness
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Send the message to the backend puppeteer
      chimeraApi.sendUserMessage(text);
    } catch (error) {
      setIsTyping(false);
      console.error("Error sending message to backend:", error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Could not send message to the main application.",
      });
    }
  };

  return (
    <div
      ref={windowRef}
      className={cn(
        "relative flex h-[600px] max-h-[80vh] w-[400px] max-w-[90vw] flex-col overflow-hidden rounded-lg text-card-foreground shadow-lg",
        isDragging && "cursor-grabbing"
      )}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        backgroundColor: `rgba(15, 23, 42, ${opacity})`,
        backdropFilter: 'blur(4px)',
       } as React.CSSProperties}
    >
      <TitleBar 
        onMouseDown={handleMouseDown} 
        onClose={onClose} 
        onOpacityChange={onOpacityChange}
        currentOpacity={opacity}
      />
      <MessageList messages={messages} isTyping={isTyping} />
      <ChatInput onSubmit={handleSendMessage} disabled={isTyping} />
    </div>
  );
}
