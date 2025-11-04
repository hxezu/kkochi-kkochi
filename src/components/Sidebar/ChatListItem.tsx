"use client";

import { useEffect, useRef, useState } from "react";
import { Ellipsis } from "lucide-react";
import type { ChatMessage } from "@/types/chat";
import SidebarDropdown from "./SidebarDropdown";

interface ChatListItemProps {
  id: string;
  title: string;
  msgs: ChatMessage[];
  selected: boolean;
  onSelect: () => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
}

export default function ChatListItem({
  id,
  title,
  selected,
  onSelect,
  onDelete,
  onRename,
}: ChatListItemProps) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleEllipsisClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(id);
    setMenuOpen(false);
  };

  const handleRenameClick = () => {
    setEditing(true);
    setMenuOpen(false);
  };

  const handleRenameSubmit = () => {
    const trimmed = newTitle.trim();
    if (trimmed && trimmed !== title) {
      onRename(id, trimmed);
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleRenameSubmit();
    if (e.key === "Escape") {
      setNewTitle(title);
      setEditing(false);
    }
  };

  return (
    <div
      onClick={!editing ? onSelect : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative p-2 flex items-center rounded-lg cursor-pointer text-sm font-medium transition-colors duration-150
        ${
          selected
            ? "bg-[var(--color-gray-100)] text-[var(--color-text-strong)]"
            : "text-[var(--color-gray-400)] hover:bg-[var(--background)]"
        }`}
    >
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleRenameSubmit}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none p-0 m-0 border-gray-300 focus:outline-none font-bold leading-tight focus:ring-0 text-sm"
          />
        ) : (
          <span
            className="truncate font-bold"
            onDoubleClick={handleRenameClick}
            title={title}
          >
            {title || "[제목 없음]"}
          </span>
        )}
      </div>

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
            <SidebarDropdown
              onDelete={handleDelete}
              onRename={handleRenameClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}
