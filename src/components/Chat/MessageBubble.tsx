import { ChatMessage } from "@/types/chat";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import { RefObject } from "react";

interface MessageBubbleProps {
  message: ChatMessage;
  scrollRef?: RefObject<HTMLDivElement | null>;
}

export default function MessageBubble({
  message,
  scrollRef,
}: MessageBubbleProps) {
  return (
    <div className="max-w-3xl">
      {message.role === "user" ? (
        <UserMessage text={message.text} />
      ) : (
        <AssistantMessage
          id={message.id}
          text={message.text}
          timestamp={message.timestamp}
          scrollRef={scrollRef}
        />
      )}
    </div>
  );
}
