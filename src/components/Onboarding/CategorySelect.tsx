import allImg from "@/assets/icons/category-all.svg";
import csImg from "@/assets/icons/category-cs.svg";
import htmlcssImg from "@/assets/icons/category-htmlcss.svg";
import jsImg from "@/assets/icons/category-js.svg";
import reactImg from "@/assets/icons/category-react.svg";
import nextImg from "@/assets/icons/category-next.svg";
import CategoryItem from "./CategoryItem";

interface CategorySelectProps {
  onSelectCategory: (category: string) => void;
}

export default function CategorySelect({
  onSelectCategory,
}: CategorySelectProps) {
  const categories = [
    { name: "전체", icon: allImg },
    { name: "CS", icon: csImg },
    { name: "HTML/CSS", icon: htmlcssImg },
    { name: "자바스크립트", icon: jsImg },
    { name: "React", icon: reactImg },
    { name: "Next.js", icon: nextImg },
  ];

  return (
    <div className="flex flex-wrap justify-center max-w-[480px] md:max-w-3xl gap-6 md:gap-10 mt-4 px-5">
      {categories.map((c) => (
        <CategoryItem
          key={c.name}
          name={c.name}
          icon={c.icon}
          onSelectCategory={onSelectCategory}
        />
      ))}
    </div>
  );
}
