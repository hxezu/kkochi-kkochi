import { notFound } from "next/navigation";
import ChatRoom from "@/components/Chat/ChatRoom";

interface ChatPageProps {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function ChatPage({
  params,
  searchParams,
}: ChatPageProps) {
  const { sessionId } = await params;
  const { category = "전체" } = await searchParams;

  if (!sessionId) {
    notFound();
  }

  return (
    <div className="h-full flex justify-center overflow-hidden">
      <ChatRoom sessionId={sessionId} category={category} />
    </div>
  );
}
