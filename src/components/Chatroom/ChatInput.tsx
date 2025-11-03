"use client";

import { Send } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface ChatInputProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  sendMessage: () => void;
  loading: boolean;
}

export default function ChatInput({
  input,
  setInput,
  sendMessage,
  loading,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex mx-4 gap-2 mb-8 shrink-0 max-w-3xl bg-white py-3 px-7 h-14 rounded-full shadow-card items-center">
      <input
        type="text"
        className="flex-1 rounded p-2 outline-none focus:ring-0"
        placeholder="답변을 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="rounded text-(--color-primary-200) disabled:text-(--color-gray-200) transition-colors duration-300 cursor-pointer"
        onClick={sendMessage}
        disabled={loading}
      >
        <Send size={18} />
      </button>
    </div>
  );
}
