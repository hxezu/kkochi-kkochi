"use client";

import { ChatMessage } from "@/types/chat";
import { useEffect, useReducer } from "react";

type ChatState = {
  sessions: { [id: string]: ChatMessage[] };
  mounted: boolean;
};

type ChatAction =
  | { type: "INIT"; payload: { [id: string]: ChatMessage[] } }
  | { type: "ADD_MESSAGE"; sessionId: string; message: ChatMessage }
  | { type: "CLEAR_HISTORY"; sessionId?: string };

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "INIT":
      return { sessions: action.payload, mounted: true };
    case "ADD_MESSAGE":
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [action.sessionId]: [
            ...(state.sessions[action.sessionId] || []),
            action.message,
          ],
        },
      };
    case "CLEAR_HISTORY":
      if (action.sessionId) {
        const copy = { ...state.sessions };
        delete copy[action.sessionId];
        return { ...state, sessions: copy };
      }
      return { ...state, sessions: {} };
    default:
      return state;
  }
}

export const useChat = () => {
  const [state, dispatch] = useReducer(chatReducer, {
    sessions: {},
    mounted: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("chatSessions");
    let loadedData = {};

    if (saved) {
      try {
        loadedData = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse chatSessions:", e);
      }
    }

    dispatch({ type: "INIT", payload: loadedData });
  }, []);

  useEffect(() => {
    if (state.mounted) {
      localStorage.setItem("chatSessions", JSON.stringify(state.sessions));
    }
  }, [state.sessions, state.mounted]);

  const addMessage = (sessionId: string, msg: ChatMessage) => {
    dispatch({ type: "ADD_MESSAGE", sessionId, message: msg });
  };

  const clearHistory = (sessionId?: string) => {
    dispatch({ type: "CLEAR_HISTORY", sessionId });
  };

  return {
    chatSessions: state.sessions,
    addMessage,
    clearHistory,
    mounted: state.mounted,
  };
};
