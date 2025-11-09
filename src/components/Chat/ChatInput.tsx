"use client";

import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({
  input,
  setInput,
  onSend,
  disabled = false,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex justify-center w-full mb-8">
      <div className="flex gap-2 w-full bg-white py-2 sm:py-3 px-3 sm:px-4 h-12 sm:h-14 rounded-full shadow-card items-center">
        <input
          type="text"
          className="flex-1 min-w-0 rounded p-2 outline-none focus:ring-0 text-xs sm:text-base placeholder:text-xs sm:placeholder:text-base"
          placeholder="답변을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded text-[var(--color-primary-200)] disabled:text-[var(--color-gray-200)] transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed"
          onClick={onSend}
          disabled={disabled || !input.trim()}
          aria-label="메시지 전송"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
