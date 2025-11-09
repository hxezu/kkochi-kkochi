"use client";

import { useSidebarStore } from "@/stores/useSidebarStore";
import { PanelLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SidebarHeader() {
  const { open, toggle } = useSidebarStore();
  const router = useRouter();

  return open ? (
    <div className="h-[60px] p-2 flex items-center justify-between w-full">
      <div
        className="flex items-center gap-2 cursor-pointer pl-2"
        onClick={() => router.push("/")}
      >
        <Image src="/logo.svg" alt="logo" width={28} height={30} />
      </div>
      <button
        onClick={toggle}
        className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-[var(--color-primary-200)]"
      >
        <PanelLeft size={20} strokeWidth={1.8} />
      </button>
    </div>
  ) : (
    <div className="h-[60px] p-2 w-full flex items-center justify-center">
      <button
        onClick={toggle}
        className="relative w-8 h-8 flex items-center justify-center cursor-pointer rounded hover:bg-gray-100 group text-[var(--color-primary-200)] "
      >
        <PanelLeft
          size={20}
          className="absolute opacity-0 group-hover:opacity-100 "
        />
        <div className="group-hover:opacity-0">
          <Image src="/logo.svg" alt="logo" width={28} height={30} />
        </div>
      </button>
    </div>
  );
}
