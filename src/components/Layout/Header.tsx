"use client";

import { Ellipsis, Plus, Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useSidebarStore } from "@/stores/useSidebarStore";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { toggle } = useSidebarStore();

  const isChatPage = pathname?.startsWith("/chat/");

  return (
    <header className="sticky top-0 z-20 h-[60px] backdrop-blur-md bg-white/10 flex justify-between items-center px-4 md:px-7">
      {/* Mobile Menu */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={toggle}
          className="p-2 hover:bg-gray-100 rounded cursor-pointer text-[var(--color-primary-200)]"
          aria-label="메뉴 열기"
        >
          <Menu size={16} strokeWidth={3} />
        </button>
        <button
          onClick={() => router.push("/")}
          className="font-santokki text-lg font-bold text-[var(--color-primary-200)]"
        >
          꼬치꼬치
        </button>
      </div>

      {/* Desktop Logo */}
      <button
        onClick={() => router.push("/")}
        className="hidden md:block font-santokki text-lg font-bold text-[var(--color-primary-200)] cursor-pointer"
      >
        꼬치꼬치
      </button>

      {/* Actions */}
      <div className="flex items-center gap-2 text-[var(--color-primary-200)]">
        <button
          className="bg-[var(--color-primary-100-50)] w-5 h-5 rounded-full flex justify-center items-center cursor-pointer md:hidden "
          onClick={() => router.push("/")}
          aria-label="새 채팅"
        >
          <Plus size={12} strokeWidth={3} />
        </button>
        {isChatPage && (
          <button
            className="p-2 hover:bg-gray-100 rounded cursor-pointer hidden md:block"
            aria-label="더보기"
          >
            <Ellipsis size={20} />
          </button>
        )}
      </div>
    </header>
  );
}
