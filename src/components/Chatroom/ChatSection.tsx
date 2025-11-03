"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/types/chat";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";

interface ChatSectionProps {
  sessionId: string;
  messages: ChatMessage[];
  addMessage: (sessionId: string, message: ChatMessage) => void;
}

export default function ChatSection({
  sessionId,
  messages,
  addMessage,
}: ChatSectionProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // 새 메시지 올 때마다 스크롤 하단
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
      category: "전체",
    };
    addMessage(sessionId, userMsg);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: "전체",
        message: input,
        context: messages,
      }),
    });
    const data = await res.json();

    const botMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: data.answer,
      timestamp: Date.now(),
      category: "전체",
    };
    addMessage(sessionId, botMsg);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto">
      <ChatMessageList
        messages={messages}
        loading={loading}
        scrollRef={scrollRef}
      />
      <ChatInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        loading={loading}
      />
    </div>
  );
}
