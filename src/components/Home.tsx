"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useChat } from "@/hooks/useChat";
import WelcomePanel from "@/components/WelcomePanel";
import { ChatMessage } from "@/types/chat";
import ChatSection from "./ChatSection";

export default function Home() {
  const { chatSessions, addMessage } = useChat();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const startChat = async (category: string) => {
    const sessionId = uuidv4();
    setSelectedChatId(sessionId);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        message: "",
        context: [],
      }),
    });
    const data = await res.json();

    const assistantMsg: ChatMessage = {
      id: uuidv4(),
      role: "assistant",
      text: data.answer,
      timestamp: Date.now(),
      category,
    };
    addMessage(sessionId, assistantMsg);
  };

  return (
    <div className="flex-1">
      {selectedChatId && chatSessions[selectedChatId] ? (
        <ChatSection
          sessionId={selectedChatId}
          messages={chatSessions[selectedChatId]}
          addMessage={addMessage}
        />
      ) : (
        <WelcomePanel onSelectCategory={startChat} />
      )}
    </div>
  );
}
