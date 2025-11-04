"use client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/stores/useChatStore";
import OnboardingSection from "@/components/Onboarding/OnboardingSection";

export default function Home() {
  const router = useRouter();
  const { sessions } = useChatStore();

  const startChat = (category: string) => {
    const sessionId = uuidv4();

    useChatStore.setState({
      sessions: {
        ...sessions,
        [sessionId]: {
          title: `[${category}] 면접 준비`,
          messages: [],
        },
      },
    });

    router.push(`/chat/${sessionId}?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full h-full">
        <OnboardingSection onSelectCategory={startChat} />
      </div>
    </div>
  );
}
