import { ChatMessage } from "@/types/chat";

interface SendMessageParams {
  category: string;
  message: string;
  context: ChatMessage[];
}

export function useChatApi() {
  const sendMessage = async ({
    category,
    message,
    context,
  }: SendMessageParams) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        message,
        context,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send message");
    }

    const data = await res.json();
    return data.answer;
  };

  return { sendMessage };
}
