"use client";
import SidebarHeader from "./SidebarHeader";
import SidebarChatList from "./SidebarChatList";
import SidebarFooter from "./SidebarFooter";
import SidebarNewChatBtn from "./SidebarNewChatBtn";
import { useSidebarStore } from "@/stores/useSidebarStore";

export default function Sidebar() {
  const { open } = useSidebarStore();

  return (
    <aside
      className={`flex flex-col justify-between bg-white transition-all duration-300
        ${open ? "w-[260px]" : "w-16"} h-full`}
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
  );
}
