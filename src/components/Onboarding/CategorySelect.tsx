import allImg from "@/assets/icons/category-all.svg";
import csImg from "@/assets/icons/category-cs.svg";
import dbImg from "@/assets/icons/category-db.svg";
import networkImg from "@/assets/icons/category-network.png";
import htmlcssImg from "@/assets/icons/category-htmlcss.svg";
import jsImg from "@/assets/icons/category-js.svg";
import javaImg from "@/assets/icons/category-java.svg";
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
    { name: "Database", icon: dbImg },
    { name: "Network", icon: networkImg },
    { name: "OS", icon: csImg },
    { name: "Algorithm", icon: allImg },
    { name: "HTML/CSS", icon: htmlcssImg },
    { name: "JavaScript", icon: jsImg },
    { name: "Java", icon: javaImg },
    { name: "React", icon: reactImg },
    { name: "Next.js", icon: nextImg },
  ];

  return (
    <div className="flex flex-wrap justify-center max-w-[480px] md:max-w-3xl gap-6 md:gap-7 mt-4 px-5">
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
