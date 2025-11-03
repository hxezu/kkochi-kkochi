"use client";

import { useState } from "react";
import { Ellipsis } from "lucide-react";
import type { ChatMessage } from "@/types/chat";
import type { Message } from "@/types/message";

interface ChatListItemProps {
  id: string;
  msgs: ChatMessage[] | Message[];
  selected: boolean;
  onSelect: () => void;
}

export default function ChatListItem({
  id,
  msgs,
  selected,
  onSelect,
}: ChatListItemProps) {
  const [hovered, setHovered] = useState(false);

  const previewText = msgs?.[0]?.text?.trim() ?? "내용이 없습니다";

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`px-4 py-2 flex items-center rounded-lg cursor-pointer text-sm font-medium transition-colors duration-150
        ${
          selected
            ? "bg-[var(--color-gray-100)] text-[var(--color-text-strong)] "
            : "text-[var(--color-gray-400)] hover:bg-[var(--background)]"
        }
      `}
    >
      {/* 텍스트 영역 */}
      <span className="flex-1 truncate font-bold">{previewText}</span>

      {/* 아이콘 영역 */}
      <div className="w-5 shrink-0 flex justify-end">
        {hovered && (
          <Ellipsis
            size={18}
            className="text-[var(--color-gray-400)] hover:text-[var(--color-text-strong)] transition-colors"
          />
        )}
      </div>
    </div>
  );
}
