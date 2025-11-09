"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage } from "@/types/chat";

interface ChatSession {
  title: string;
  messages: ChatMessage[];
}

interface ChatState {
  sessions: Record<string, ChatSession>;
  addMessage: (sessionId: string, message: ChatMessage) => void;
  renameSession: (sessionId: string, newTitle: string) => void;
  deleteSession: (sessionId: string) => void;
  clearAllSessions: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: {},

      addMessage: (sessionId, message) => {
        const { sessions } = get();
        const existing = sessions[sessionId];
        const title = existing?.title ?? `[${message.category}] 면접 준비`;

        set({
          sessions: {
            ...sessions,
            [sessionId]: {
              title,
              messages: [...(existing?.messages || []), message],
            },
          },
        });
      },

      renameSession: (sessionId, newTitle) => {
        const { sessions } = get();
        const target = sessions[sessionId];
        if (!target) return;

        set({
          sessions: {
            ...sessions,
            [sessionId]: {
              ...target,
              title: newTitle,
            },
          },
        });
      },

      deleteSession: (sessionId) => {
        const { sessions } = get();
        const newSessions = { ...sessions };
        delete newSessions[sessionId];
        set({ sessions: newSessions });
      },

      clearAllSessions: () => {
        set({ sessions: {} });
      },
    }),
    {
      name: "chatSessions",
    }
  )
);
