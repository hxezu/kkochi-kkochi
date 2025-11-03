"use client";

import { ReactNode } from "react";
import ChatSectionHeader from "@/components/Chatroom/ChatSectionHeader";

interface ChatLayoutProps {
  children: ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <main className="h-screen flex flex-col">
      <ChatSectionHeader />
      <div className="flex-1 overflow-hidden">{children}</div>
    </main>
  );
}
