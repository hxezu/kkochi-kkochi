export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
  category: string;
};
