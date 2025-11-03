// ChatMessageList.tsx
"use client";

import { RefObject } from "react";
import { ChatMessage } from "@/types/chat";
import ChatBubble from "./ChatBubble";

interface ChatMessageListProps {
  messages: ChatMessage[];
  loading: boolean;
  scrollRef: RefObject<HTMLDivElement | null>;
}

export default function ChatMessageList({
  messages,
  loading,
  scrollRef,
}: ChatMessageListProps) {
  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto flex flex-col gap-2 p-4 pt-6 scrollbar-hide"
    >
      {messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          role={msg.role}
          text={msg.text}
          timestamp={msg.timestamp}
        />
      ))}
      {loading && <div className="text-gray-400">생각 중...</div>}
    </div>
  );
}
