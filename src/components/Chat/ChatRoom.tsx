"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/types/chat";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { useChatApi } from "@/hooks/useChatApi";
import { useChatStore } from "@/stores/useChatStore";
import { useKeyboardOffset } from "@/hooks/useKeyboardOffset";
import { useSafeArea } from "@/hooks/useSafeArea";
import { useInitialMessage } from "@/hooks/useInitialMessage";

interface ChatRoomProps {
  sessionId: string;
  category: string;
}

export default function ChatRoom({ sessionId, category }: ChatRoomProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { sendMessage: sendApiMessage } = useChatApi();
  const { sessions, addMessage } = useChatStore();
  const messages = sessions[sessionId]?.messages || [];

  const keyboardOffset = useKeyboardOffset();
  useSafeArea();
  const initialLoading = useInitialMessage(
    sessionId,
    category,
    messages.length
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmedInput,
      timestamp: Date.now(),
      category,
    };

    addMessage(sessionId, userMessage);
    setInput("");
    setLoading(true);

    try {
      const answer = await sendApiMessage({
        category,
        message: trimmedInput,
        context: messages,
      });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: answer,
        timestamp: Date.now(),
        category,
      };

      addMessage(sessionId, assistantMessage);
    } catch (error) {
      console.error("Failed to send message:", error);

      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.",
        timestamp: Date.now(),
        category,
      };

      addMessage(sessionId, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full max-w-3xl mx-auto">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 pt-6 pb-24 scrollbar-hide"
      >
        <ChatMessageList
          messages={messages}
          loading={loading || initialLoading}
          scrollRef={scrollRef}
        />
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 transition-all duration-200"
        style={{
          bottom: `calc(${keyboardOffset}px + env(safe-area-inset-bottom, 0px))`,
        }}
      >
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={handleSendMessage}
          disabled={loading}
        />
      </div>
    </div>
  );
}
