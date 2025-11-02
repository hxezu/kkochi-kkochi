import CategorySelect from "./CategorySelect";

interface WelcomePanelProps {
  onSelectCategory: (category: string) => void;
}

export default function WelcomePanel({ onSelectCategory }: WelcomePanelProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-700">
      <h1 className="text-2xl font-bold mb-6">🧠 프론트엔드 CS 챗봇</h1>
      <div className="text-center mb-4">
        카테고리를 선택하면 면접 질문이 시작됩니다.
      </div>
      <CategorySelect onSelectCategory={onSelectCategory} />
    </div>
  );
}
