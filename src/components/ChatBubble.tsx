interface ChatBubbleProps {
  role: "user" | "assistant";
  text: string;
}

export default function ChatBubble({ role, text }: ChatBubbleProps) {
  return (
    <div
      className={`p-2 rounded-lg my-1 max-w-[80%] ${
        role === "user" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"
      }`}
    >
      <b>{role === "user" ? "🙋‍♂️" : "🤖"} </b>
      {text}
    </div>
  );
}
