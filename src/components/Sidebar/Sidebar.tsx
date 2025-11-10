"use client";

import { useEffect } from "react";
import { useSidebarStore } from "@/stores/useSidebarStore";
import SidebarHeader from "./SidebarHeader";
import SidebarChatList from "./SidebarChatList";
import SidebarFooter from "./SidebarFooter";
import NewChatButton from "./NewChatBtn";

export default function Sidebar() {
  const { open, close, setOpen } = useSidebarStore();

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

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
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          fixed md:relative
          top-0 left-0 h-screen
          bg-white 
          flex flex-col justify-between
          z-50
          ${
            open
              ? "translate-x-0 w-64"
              : "-translate-x-full md:translate-x-0 md:w-16"
          }
        `}
        style={{
          transition: "transform 300ms ease-in-out, width 300ms ease-in-out",
        }}
      >
        <div className="flex flex-col items-center px-2">
          <SidebarHeader />
          <NewChatButton />
        </div>

        {open && (
          <div className="flex-1 flex flex-col overflow-y-auto px-4 gap-2 mt-2">
            <SidebarChatList />
          </div>
        )}

        {/* <SidebarFooter /> */}
      </aside>
    </>
  );
}
