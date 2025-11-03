import Image from "next/image";

interface ChatBubbleProps {
  role: "user" | "assistant";
  text: string;
  timestamp: number;
}

export default function ChatBubble({ role, text, timestamp }: ChatBubbleProps) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "오후" : "오전";
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12;

  const timeString = `${ampm} ${formattedHour}:${minutes}`;

  return (
    <div className="max-w-3xl ">
      {role === "user" ? (
        <div className="flex justify-end ">
          <div className="bg-(--color-primary-200) text-white p-4 rounded-b-xl rounded-tl-xl max-w-[70%] md:max-w-[540px] ">
            {text}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Image src="/logo.svg" alt="챗봇 이미지" width={32} height={30} />
          <div className="flex justify-start space-x-2">
            <div className="bg-white p-4 rounded-xl max-w-[70%] md:max-w-[540px]">
              {text}
            </div>
            <span className="text-xs text-(--color-gray-300) flex items-end">
              {timeString}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
