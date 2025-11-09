"use client";

import { RefObject } from "react";
import { ChatMessage } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import LoadingIndicator from "./LoadingIndicator";

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
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          scrollRef={scrollRef}
        />
      ))}
      {loading && <LoadingIndicator />}
    </div>
  );
}
