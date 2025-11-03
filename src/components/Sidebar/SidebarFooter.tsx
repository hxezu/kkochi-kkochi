"use client";

import { useSidebarStore } from "@/stores/useSidebarStore";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function SidebarFooter() {
  const { open } = useSidebarStore();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex items-center mb-4 px-6 ${
        open ? "justify-end" : "justify-center flex-col"
      }`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center justify-center p-2 border border-(--color-gray-200) rounded-full text-(--color-gray-300) cursor-pointer w-8 h-8"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}
