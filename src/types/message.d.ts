export type Message = {
  role: "user" | "bot";
  text: string;
  timestamp: string;
  id: string;
};
