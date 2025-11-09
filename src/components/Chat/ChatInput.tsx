"use client";

import { Send } from "lucide-react";
import { useRef, useEffect } from "react";

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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      onSend();
    }
  };

  // 자동 높이 조절
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input]);

  return (
    <div className="flex justify-center w-full mb-8">
      <div className="flex gap-2 w-full bg-white py-2 sm:py-3 px-3 sm:px-4 min-h-[48px] sm:min-h-[56px] rounded-full shadow-card items-center">
        <textarea
          ref={inputRef}
          className="flex-1 min-w-0 rounded pl-10 py-2 outline-none focus:ring-0 text-xs sm:text-base  sm:placeholder:text-base resize-none overflow-y-auto scrollbar-hide max-h-[120px]"
          placeholder="답변을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
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
