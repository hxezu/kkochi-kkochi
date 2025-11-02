export type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: number;
  category: string;
};
