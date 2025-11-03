import Image, { StaticImageData } from "next/image";

interface CategoryItemProps {
  name: string;
  icon: StaticImageData;
  onSelectCategory: (category: string) => void;
}

export default function CategoryItem({
  name,
  icon,
  onSelectCategory,
}: CategoryItemProps) {
  return (
    <button
      onClick={() => onSelectCategory(name)}
      className="
        p-2 md:px-10 md:py-5 rounded-2xl shadow-card cursor-pointer 
        w-25 h-20 md:w-45 md:h-25 flex flex-col justify-center items-center
        transition transform duration-200 ease-in-out
        hover:scale-105 hover:shadow-lg
      "
    >
      <div className="w-5 h-5 md:w-10 md:h-10 relative">
        <Image src={icon} alt={name} fill />
      </div>
      <span className="mt-3 font-bold text-[10px] md:text-sm">{name}</span>
    </button>
  );
}
