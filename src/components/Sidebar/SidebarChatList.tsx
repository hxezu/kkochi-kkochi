"use client";
import { useRouter, usePathname } from "next/navigation";
import ChatListItem from "./ChatListItem";
import { useChatStore } from "@/stores/useChatStore";

export default function SidebarChatList() {
  const { sessions, clearHistory, renameSession } = useChatStore();
  const router = useRouter();
  const pathname = usePathname();

  const selectedChatId = pathname?.startsWith("/chat/")
    ? pathname.split("/chat/")[1]
    : null;

  const chatEntries = Object.entries(sessions);
  if (chatEntries.length === 0) return null;

  return (
    <div className="space-y-1">
      {chatEntries.map(([id, session]) => (
        <ChatListItem
          key={id}
          id={id}
          title={session.title}
          msgs={session.messages}
          selected={selectedChatId === id}
          onSelect={() => router.push(`/chat/${id}`)}
          onDelete={(id) => clearHistory(id)}
          onRename={(id, newTitle) => renameSession(id, newTitle)}
        />
      ))}
    </div>
  );
}
