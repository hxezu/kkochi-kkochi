"use client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import { ChatMessage } from "@/types/chat";
import OnboardingSection from "@/components/Onboarding/OnboardingSection";

export default function Home() {
  const { addMessage } = useChat();
  const router = useRouter();

  const startChat = async (category: string) => {
    const sessionId = uuidv4();

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

    router.push(`/chat/${sessionId}`);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full h-full">
        <OnboardingSection onSelectCategory={startChat} />
      </div>
    </div>
  );
}
