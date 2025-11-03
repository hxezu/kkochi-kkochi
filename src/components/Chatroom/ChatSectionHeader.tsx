import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatSectionHeader() {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-50 h-[60px] backdrop-blur-md bg-white/10 flex py-3 justify-between px-7 text-(--color-primary-200)">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span className="font-santokki  text-lg font-bold">꼬치꼬치</span>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded cursor-pointer ">
        <Ellipsis size={20} />
      </button>
    </div>
  );
}
