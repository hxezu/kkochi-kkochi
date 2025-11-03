"use client";
import { useParams, useRouter } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import { useEffect } from "react";
import ChatSection from "@/components/Chatroom/ChatSection";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { chatSessions, addMessage, mounted } = useChat();

  const sessionId = params?.sessionId;

  useEffect(() => {
    if (mounted) {
      // mounted 된 후에만 세션 체크
      if (!sessionId || Array.isArray(sessionId) || !chatSessions[sessionId]) {
        router.replace("/");
      }
    }
  }, [sessionId, chatSessions, router, mounted]);

  if (
    !mounted ||
    !sessionId ||
    Array.isArray(sessionId) ||
    !chatSessions[sessionId]
  ) {
    return null;
  }

  return (
    <div className="h-full flex justify-center items-center">
      <ChatSection
        sessionId={sessionId}
        messages={chatSessions[sessionId]}
        addMessage={addMessage}
      />
    </div>
  );
}
