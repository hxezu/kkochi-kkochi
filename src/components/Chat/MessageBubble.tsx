import { ChatMessage } from "@/types/chat";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className="max-w-3xl">
      {message.role === "user" ? (
        <UserMessage text={message.text} />
      ) : (
        <AssistantMessage text={message.text} timestamp={message.timestamp} />
      )}
    </div>
  );
}
