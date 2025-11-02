"use client";

import { useChat } from "@/hooks/useChat";
import { useRouter, usePathname } from "next/navigation";

export default function ChatList() {
  const { chatSessions, mounted, clearHistory } = useChat();
  const router = useRouter();
  const pathname = usePathname();

  const selectedChatId = pathname?.startsWith("/chat/")
    ? pathname.split("/chat/")[1]
    : null;

  // 마운트 전에는 빈 상태 렌더링
  if (!mounted) {
    return (
      <aside className="w-1/3 border-r overflow-y-auto p-2">
        <h2 className="font-bold mb-2">채팅 리스트</h2>
        <div className="text-gray-400 text-sm p-2">로딩 중...</div>
      </aside>
    );
  }

  const chatEntries = Object.entries(chatSessions);

  return (
    <aside className="w-1/3 border-r overflow-y-auto p-2 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold">채팅 리스트</h2>
        {chatEntries.length > 0 && (
          <button
            className="text-sm text-red-500 hover:underline"
            onClick={() => {
              if (confirm("정말 모든 채팅 기록을 삭제하시겠습니까?")) {
                clearHistory();
              }
            }}
          >
            전체 삭제
          </button>
        )}
      </div>

      {chatEntries.length === 0 ? (
        <div className="text-gray-400 text-sm p-2">아직 채팅이 없습니다</div>
      ) : (
        chatEntries.map(([id, msgs]) => (
          <div
            key={id}
            className={`p-2 cursor-pointer rounded hover:bg-gray-200 ${
              selectedChatId === id ? "bg-gray-300" : ""
            }`}
            onClick={() => router.push(`/chat/${id}`)}
          >
            {msgs?.[0]?.text?.slice(0, 30) ?? "내용이 없습니다"}...
          </div>
        ))
      )}
    </aside>
  );
}
