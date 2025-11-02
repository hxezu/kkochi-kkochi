"use client";
import { useState } from "react";
import { ChatMessage } from "@/types/chat";
import ChatBubble from "./ChatBubble";

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

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 사용자 메시지 추가
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

    // API 호출 (Ollama 또는 백엔드)
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

    // bot 메시지 추가
    const botMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "bot",
      text: data.answer,
      timestamp: Date.now(),
      category: "전체",
    };
    addMessage(sessionId, botMsg);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 mb-4">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} role={msg.role} text={msg.text} />
        ))}
        {loading && <div className="text-gray-400">생각 중...</div>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          placeholder="답변을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
          disabled={loading}
        >
          보내기
        </button>
      </div>
    </div>
  );
}
