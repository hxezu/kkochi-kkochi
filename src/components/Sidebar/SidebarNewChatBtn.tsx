"use client";

import { useSidebarStore } from "@/stores/useSidebarStore";
import { Plus } from "lucide-react";

export default function SidebarNewChatBtn() {
  const { open } = useSidebarStore();

  return open ? (
    <button
      className=" w-full h-10 flex gap-2 items-center py-2 px-4 font-bold cursor-pointer 
        rounded-lg transition text-[var(--color-primary-200)] hover:bg-[var(--background)]"
    >
      <div className="bg-[var(--color-primary-100-50)] w-5 h-5 rounded-full flex justify-center items-center">
        <Plus size={12} />
      </div>
      새로운 면접
    </button>
  ) : (
    <button
      className=" h-10 flex items-center cursor-pointer 
        rounded-lg transition text-[var(--color-primary-200)] "
    >
      <div className="bg-[var(--color-primary-100-50)] w-5 h-5 rounded-full flex justify-center items-center">
        <Plus size={12} />
      </div>
    </button>
  );
}
