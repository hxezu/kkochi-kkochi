interface CategorySelectProps {
  onSelectCategory: (category: string) => void;
}

export default function CategorySelect({
  onSelectCategory,
}: CategorySelectProps) {
  const categories = ["전체", "CS", "HTML/CSS", "Javascript", "React"];

  return (
    <div className="flex gap-2 justify-center mt-4">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelectCategory(c)}
          className="px-3 py-1 rounded border bg-white hover:bg-blue-100"
        >
          {c}
        </button>
      ))}
    </div>
  );
}
