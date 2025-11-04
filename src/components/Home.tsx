"use client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import OnboardingSection from "@/components/Onboarding/OnboardingSection";

export default function Home() {
  const router = useRouter();

  const startChat = (category: string) => {
    const sessionId = uuidv4();

    // 카테고리를 쿼리 파라미터로 전달
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
