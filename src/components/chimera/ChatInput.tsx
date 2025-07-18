"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatInputProps = {
  onSubmit: (message: string) => Promise<void>;
  disabled?: boolean;
};

export function ChatInput({ onSubmit, disabled }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      await onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-slate-600 p-2"
    >
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ask Chip anything..."
        className="h-10 flex-1 border-0 bg-transparent text-base placeholder-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        disabled={disabled}
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className={cn(
          "h-10 w-10 shrink-0 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        disabled={disabled || !inputValue.trim()}
        aria-label="Send message"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}
