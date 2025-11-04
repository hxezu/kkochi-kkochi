"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ChatSection from "@/components/Chatroom/ChatSection";

export default function ChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = params?.sessionId;
  const category = searchParams?.get("category") || "전체";

  useEffect(() => {
    if (!sessionId || Array.isArray(sessionId)) {
      router.replace("/");
    }
  }, [sessionId, router]);

  if (!sessionId || Array.isArray(sessionId)) return null;

  return (
    <div className="h-full flex justify-center overflow-hidden">
      <ChatSection sessionId={sessionId} category={category} />
    </div>
  );
}
