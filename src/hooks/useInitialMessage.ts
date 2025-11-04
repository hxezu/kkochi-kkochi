import { useEffect, useRef, useState } from "react";
import { useChatApi } from "./useChatApi";
import { useChatStore } from "@/stores/useChatStore";
import type { ChatMessage } from "@/types/chat";

export function useInitialMessage(
  sessionId: string,
  category: string,
  messagesLength: number
) {
  const [loading, setLoading] = useState(false);
  const hasLoadedInitialMessage = useRef(false);
  const { sendMessage: sendApiMessage } = useChatApi();
  const { addMessage, sessions } = useChatStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsub = useChatStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });
    setIsHydrated(useChatStore.persist.hasHydrated());
    return () => unsub();
  }, []);

  useEffect(() => {
    const loadInitialMessage = async () => {
      if (!isHydrated) return;
      if (hasLoadedInitialMessage.current || messagesLength > 0) return;
      if (!sessions[sessionId]) return;

      hasLoadedInitialMessage.current = true;
      setLoading(true);

      try {
        const answer = await sendApiMessage({
          category,
          message: "",
          context: [],
        });

        if (!useChatStore.getState().sessions[sessionId]) return;

        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          text: answer,
          timestamp: Date.now(),
          category,
        };
        addMessage(sessionId, assistantMsg);
      } catch (error) {
        console.error("Failed to fetch initial message:", error);

        if (!useChatStore.getState().sessions[sessionId]) return;

        addMessage(sessionId, {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.",
          timestamp: Date.now(),
          category,
        });
      } finally {
        setLoading(false);
      }
    };

    loadInitialMessage();
  }, [
    isHydrated,
    sessionId,
    category,
    messagesLength,
    addMessage,
    sendApiMessage,
    sessions,
  ]);

  return loading;
}
