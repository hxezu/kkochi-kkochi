import { formatTime } from "@/utils/formatTime";
import Image from "next/image";

interface AssistantBubbleProps {
  text: string;
  timestamp: number;
}

export default function AssistantBubble({
  text,
  timestamp,
}: AssistantBubbleProps) {
  const timeString = formatTime(timestamp);
  return (
    <div className="space-y-4">
      <Image src="/logo.svg" alt="챗봇 이미지" width={32} height={30} />
      <div className="flex justify-start space-x-2">
        <div className="bg-white text-[13px] md:text-[15px] p-2 md:p-4 rounded-xl max-w-[70%] lg:max-w-[540px]">
          {text}
        </div>
        <span className="text-[10px] md:text-xs text-(--color-gray-300) flex items-end">
          {timeString}
        </span>
      </div>
    </div>
  );
}
