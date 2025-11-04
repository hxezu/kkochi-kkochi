"use client";

import { useEffect, useRef, useState } from "react";
import { Ellipsis } from "lucide-react";
import type { ChatMessage } from "@/types/chat";
import type { Message } from "@/types/message";
import SidebarDropdown from "./SidebarDropdown";

interface ChatListItemProps {
  id: string;
  msgs: ChatMessage[] | Message[];
  selected: boolean;
  onSelect: () => void;
  onDelete?: (id: string) => void;
}

export default function ChatListItem({
  id,
  msgs,
  selected,
  onSelect,
  onDelete,
}: ChatListItemProps) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const previewText = msgs?.[0]?.text?.trim() ?? "내용이 없습니다";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !btnRef.current?.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleEllipsisClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(id);
    setMenuOpen(false);
  };

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative px-4 py-2 flex items-center rounded-lg cursor-pointer text-sm font-medium transition-colors duration-150
        ${
          selected
            ? "bg-[var(--color-gray-100)] text-[var(--color-text-strong)]"
            : "text-[var(--color-gray-400)] hover:bg-[var(--background)]"
        }`}
    >
      {/* 텍스트 영역 */}
      <span className="flex-1 truncate font-bold">{previewText}</span>

      {/* 아이콘 영역 */}
      <div className="relative w-5 shrink-0 flex justify-end">
        <button
          ref={btnRef}
          className={`text-[var(--color-gray-400)] hover:text-[var(--color-text-strong)] transition-all duration-150 cursor-pointer ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleEllipsisClick}
        >
          <Ellipsis size={18} />
        </button>

        {menuOpen && (
          <div ref={menuRef} className="absolute top-full -right-2 z-50">
            <SidebarDropdown onDelete={handleDelete} />
          </div>
        )}
      </div>
    </div>
  );
}
