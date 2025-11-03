import { Moon, Sun } from "lucide-react";

interface Props {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function SidebarFooter({ darkMode, setDarkMode }: Props) {
  return (
    <div className="p-4 h-10 flex justify-end items-end">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center justify-center p-1 border border-(--color-gray-200) rounded-full transition h-8 w-8 text-(--color-gray-300) cursor-pointer"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}
