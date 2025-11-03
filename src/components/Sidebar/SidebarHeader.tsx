import { PanelLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  onClose: () => void;
}

export default function SidebarHeader({ onClose }: Props) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="h-[60px] p-5 flex items-center justify-between">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={handleClick}
      >
        <Image src="/logo.svg" alt="logo" width={28} height={30} />
      </div>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
      >
        <PanelLeft size={20} strokeWidth={1.8} />
      </button>
    </div>
  );
}
