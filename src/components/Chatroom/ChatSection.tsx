"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/types/chat";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { useChatApi } from "@/hooks/useChatApi";

interface ChatSectionProps {
  sessionId: string;
  category: string;
  messages: ChatMessage[];
  addMessage: (sessionId: string, message: ChatMessage) => void;
}

export default function ChatSection({
  sessionId,
  category,
  messages,
  addMessage,
}: ChatSectionProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { sendMessage: sendApiMessage } = useChatApi();
  const initialLoadRef = useRef(false);

  // 초기 메시지 로드
  useEffect(() => {
    const loadInitialMessage = async () => {
      if (messages.length === 0 && !initialLoadRef.current) {
        initialLoadRef.current = true;
        setLoading(true);

        try {
          const answer = await sendApiMessage({
            category,
            message: "",
            context: [],
          });

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
          const errorMsg: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            text: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.",
            timestamp: Date.now(),
            category,
          };
          addMessage(sessionId, errorMsg);
        } finally {
          setLoading(false);
        }
      }
    };

    loadInitialMessage();
  }, [sessionId, messages.length, category, addMessage, sendApiMessage]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const viewport = window.visualViewport;

    const handleResize = () => {
      const keyboardHeight = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop
      );

      const safeAreaBottom =
        Number(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--sat")
            ?.replace("px", "")
        ) || 0;

      setKeyboardOffset(keyboardHeight + safeAreaBottom);
    };

    viewport.addEventListener("resize", handleResize);
    viewport.addEventListener("scroll", handleResize);

    handleResize();

    return () => {
      viewport.removeEventListener("resize", handleResize);
      viewport.removeEventListener("scroll", handleResize);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const safeArea = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("env(safe-area-inset-bottom)");
    document.documentElement.style.setProperty("--sat", safeArea);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: input,
      timestamp: Date.now(),
      category,
    };
    addMessage(sessionId, userMsg);
    setInput("");
    setLoading(true);

    try {
      const answer = await sendApiMessage({
        category,
        message: input,
        context: messages,
      });

      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: answer,
        timestamp: Date.now(),
        category,
      };
      addMessage(sessionId, botMsg);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.",
        timestamp: Date.now(),
        category,
      };
      addMessage(sessionId, errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full max-w-3xl mx-auto">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pt-6 pb-24 scrollbar-hide"
      >
        <ChatMessageList
          messages={messages}
          loading={loading}
          scrollRef={scrollRef}
        />
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 transition-all duration-200"
        style={{
          bottom: `calc(${keyboardOffset}px + env(safe-area-inset-bottom, 0px))`,
        }}
      >
        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}
