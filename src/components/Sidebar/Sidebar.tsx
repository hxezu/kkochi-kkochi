"use client";
import SidebarHeader from "./SidebarHeader";
import SidebarChatList from "./SidebarChatList";
import SidebarFooter from "./SidebarFooter";
import SidebarNewChatBtn from "./SidebarNewChatBtn";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { useEffect } from "react";

export default function Sidebar() {
  const { open, close } = useSidebarStore();

  // 모바일에서 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (
        open &&
        sidebar &&
        !sidebar.contains(e.target as Node) &&
        window.innerWidth < 768
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, close]);

  return (
    <>
      {/* 모바일 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-80 md:hidden"
          onClick={close}
        />
      )}

      {/* 사이드바 */}
      <aside
        id="sidebar"
        className={`
          fixed md:relative
          top-0 left-0 h-screen
          bg-white 
          flex flex-col justify-between
          transition-all duration-300 ease-in-out
          z-100
          ${
            open
              ? "translate-x-0 w-64"
              : "-translate-x-full md:translate-x-0 md:w-16"
          }
        `}
      >
        <div className="flex flex-col items-center px-2">
          <SidebarHeader />
          <SidebarNewChatBtn />
        </div>

        {open && (
          <div className="flex-1 flex flex-col overflow-y-auto px-4 gap-2 mt-2">
            <SidebarChatList />
          </div>
        )}

        <SidebarFooter />
      </aside>
    </>
  );
}
