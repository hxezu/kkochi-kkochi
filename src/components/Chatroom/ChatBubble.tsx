import { formatTime } from "@/utils/formatTime";

import UserBubble from "./UserBubble";
import AssistantBubble from "./AssistantBubble";

interface ChatBubbleProps {
  role: "user" | "assistant";
  text: string;
  timestamp: number;
}

export default function ChatBubble({ role, text, timestamp }: ChatBubbleProps) {
  return (
    <div className="max-w-3xl ">
      {role === "user" ? (
        <UserBubble text={text} />
      ) : (
        <AssistantBubble text={text} timestamp={timestamp} />
      )}
    </div>
  );
}
