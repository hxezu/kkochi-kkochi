"use client";
import { useParams } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import ChatSection from "@/components/ChatSection";

export default function ChatPage() {
  const params = useParams();
  const { chatSessions, addMessage } = useChat();

  const sessionId = params?.sessionId;
  if (!sessionId || Array.isArray(sessionId) || !chatSessions[sessionId]) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        존재하지 않는 세션입니다.
      </div>
    );
  }

  return (
    <div className="flex-1">
      <ChatSection
        sessionId={sessionId}
        messages={chatSessions[sessionId]}
        addMessage={addMessage}
      />
    </div>
  );
}
