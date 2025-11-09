"use client";
import { useRouter, usePathname } from "next/navigation";
import ChatListItem from "./ChatListItem";
import { useChatStore } from "@/stores/useChatStore";
import toast from "react-hot-toast";

export default function SidebarChatList() {
  const { sessions, deleteSession, renameSession } = useChatStore();
  const router = useRouter();
  const pathname = usePathname();

  const selectedChatId = pathname?.startsWith("/chat/")
    ? pathname.split("/chat/")[1]
    : null;

  const chatEntries = Object.entries(sessions);
  if (chatEntries.length === 0) return null;

  const handleDelete = (id: string) => {
    deleteSession(id);

    toast.success(`대화를 삭제했어요`);
    if (selectedChatId === id) router.push("/");
  };

  const handleRename = (id: string, newTitle: string) => {
    renameSession(id, newTitle);
    toast.success(`제목을 변경했어요`);
  };

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
          onDelete={handleDelete}
          onRename={handleRename}
        />
      ))}
    </div>
  );
}
