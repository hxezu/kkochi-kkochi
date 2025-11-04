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

interface ChatSectionProps {
  sessionId: string;
  category: string;
}

export default function ChatSection({ sessionId, category }: ChatSectionProps) {
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
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: input,
      timestamp: Date.now(),
      category,
    };
    addMessage(sessionId, userMsg);
    setInput("");
    setLoading(true);

    try {
      const answer = await sendApiMessage({
        category,
        message: input,
        context: messages,
      });

      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: answer,
        timestamp: Date.now(),
        category,
      };
      addMessage(sessionId, botMsg);
    } catch (error) {
      console.error("Failed to send message:", error);
      addMessage(sessionId, {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.",
        timestamp: Date.now(),
        category,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full max-w-3xl mx-auto">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pt-6 pb-24 scrollbar-hide"
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
          sendMessage={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}
