"use client";

import { useSidebarStore } from "@/stores/useSidebarStore";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewChatButton() {
  const { open } = useSidebarStore();
  const router = useRouter();

  const handleClick = () => router.push("/");

  if (open) {
    return (
      <button
        onClick={handleClick}
        className="w-full h-10 flex gap-2 items-center py-2 px-4 font-bold cursor-pointer rounded-lg transition text-[var(--color-primary-200)] hover:bg-[var(--background)]"
      >
        <div className="bg-[var(--color-primary-100-50)] w-5 h-5 rounded-full flex justify-center items-center">
          <Plus size={12} strokeWidth={3} />
        </div>
        새로운 면접
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="h-10 flex items-center cursor-pointer rounded-lg transition text-[var(--color-primary-200)]"
      aria-label="새 채팅"
    >
      <div className="bg-[var(--color-primary-100-50)] w-5 h-5 rounded-full flex justify-center items-center">
        <Plus size={12} />
      </div>
    </button>
  );
}
