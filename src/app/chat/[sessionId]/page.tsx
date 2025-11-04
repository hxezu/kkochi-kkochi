"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import { useEffect } from "react";
import ChatSection from "@/components/Chatroom/ChatSection";

export default function ChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { chatSessions, addMessage, mounted } = useChat();

  const sessionId = params?.sessionId;
  const category = searchParams?.get("category") || "전체";

  useEffect(() => {
    if (mounted) {
      if (!sessionId || Array.isArray(sessionId)) {
        router.replace("/");
      }
    }
  }, [sessionId, mounted, router]);

  if (!mounted || !sessionId || Array.isArray(sessionId)) {
    return null;
  }

  return (
    <div className="h-full flex justify-center overflow-hidden">
      <ChatSection
        sessionId={sessionId}
        category={category}
        messages={chatSessions[sessionId] || []}
        addMessage={addMessage}
      />
    </div>
  );
}
