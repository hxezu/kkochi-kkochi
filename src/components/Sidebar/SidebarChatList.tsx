"use client";

import { useChat } from "@/hooks/useChat";
import { useRouter, usePathname } from "next/navigation";
import ChatListItem from "./ChatListItem";

export default function SidebarChatList() {
  const { chatSessions, mounted } = useChat();
  const router = useRouter();
  const pathname = usePathname();

  const selectedChatId = pathname?.startsWith("/chat/")
    ? pathname.split("/chat/")[1]
    : null;

  if (!mounted) {
    return <div className="text-gray-400 text-sm p-2">로딩 중...</div>;
  }

  const chatEntries = Object.entries(chatSessions);

  if (chatEntries.length === 0) {
    return (
      <div className="text-gray-400 text-sm p-2">아직 대화가 없습니다.</div>
    );
  }

  return (
    <div className="space-y-1">
      {chatEntries.map(([id, msgs]) => (
        <ChatListItem
          key={id}
          id={id}
          msgs={msgs}
          selected={selectedChatId === id}
          onSelect={() => router.push(`/chat/${id}`)}
        />
      ))}
    </div>
  );
}
