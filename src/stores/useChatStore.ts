// useChatStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage } from "@/types/chat";

type ChatSession = {
  title: string;
  messages: ChatMessage[];
};

type ChatState = {
  sessions: Record<string, ChatSession>;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  addMessage: (sessionId: string, message: ChatMessage) => void;
  renameSession: (sessionId: string, newTitle: string) => void;
  clearHistory: (sessionId?: string) => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: {},
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

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

      clearHistory: (sessionId) => {
        const { sessions } = get();
        if (sessionId) {
          const copy = { ...sessions };
          delete copy[sessionId];
          set({ sessions: copy });
        } else {
          set({ sessions: {} });
        }
      },
    }),
    {
      name: "chatSessions",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true); // ✅ hydration 완료 신호
      },
    }
  )
);
