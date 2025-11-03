"use client";
import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarChatList from "./SidebarChatList";
import SidebarFooter from "./SidebarFooter";
import SidebarNewChatBtn from "./SidebarNewChatBtn";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  if (!open) return null;

  return (
    <aside
      className={`h-full w-[260px] flex flex-col justify-between 
       bg-white transition-colors duration-300`}
    >
      <SidebarHeader onClose={() => setOpen(false)} />

      <div className="flex-1 flex flex-col overflow-y-auto px-4 gap-2">
        <SidebarNewChatBtn />
        <SidebarChatList />
      </div>

      <SidebarFooter darkMode={darkMode} setDarkMode={setDarkMode} />
    </aside>
  );
}
