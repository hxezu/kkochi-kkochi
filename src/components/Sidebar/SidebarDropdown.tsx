"use client";

import { Pencil, Trash2 } from "lucide-react";

interface SidebarDropdownProps {
  onDelete: () => void;
  onRename?: () => void;
}

export default function SidebarDropdown({
  onDelete,
  onRename,
}: SidebarDropdownProps) {
  return (
    <div
      className="w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 animate-fadeIn
        backdrop-blur-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onRename}
        className="w-full px-4 py-2 text-left text-sm  hover:bg-gray-100 flex items-center gap-2 cursor-pointer "
      >
        <Pencil size={16} />
        제목 수정
      </button>
      <button
        onClick={onDelete}
        className="w-full px-4 py-2 text-left text-sm text-(--red) hover:bg-red-50 flex items-center gap-2 cursor-pointer"
      >
        <Trash2 size={16} />
        채팅 삭제
      </button>
    </div>
  );
}
