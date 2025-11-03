"use client";

import { Ellipsis, Menu, Plus } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useSidebarStore } from "@/stores/useSidebarStore";

export default function ChatSectionHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { toggle } = useSidebarStore();

  const handleNewChat = () => {
    router.push("/");
  };

  // /chat/[id] 경로인지 확인
  const isChatPage = pathname?.startsWith("/chat/");

  return (
    <div className="sticky top-0 z-50 h-[60px] backdrop-blur-md bg-white/10 flex py-3 justify-between px-4 md:px-7 text-(--color-primary-200)">
      {/* 모바일 메뉴 */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={toggle}
          className="p-2 hover:bg-gray-100 rounded cursor-pointer"
        >
          <Menu size={20} />
        </button>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span className="font-santokki text-lg font-bold">꼬치꼬치</span>
        </div>
      </div>

      {/* 데스크톱 - 기존 로고 */}
      <div
        className="hidden md:flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span className="font-santokki text-lg font-bold">꼬치꼬치</span>
      </div>

      {/* 오른쪽 버튼들 */}
      <div className="flex items-center gap-2">
        <button
          className="bg-[var(--color-primary-100-50)] w-5 h-5 rounded-full flex justify-center items-center cursor-pointer md:hidden"
          onClick={handleNewChat}
        >
          <Plus size={12} />
        </button>
        {isChatPage && (
          <button className="p-2 hover:bg-gray-100 rounded cursor-pointer hidden md:block">
            <Ellipsis size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
