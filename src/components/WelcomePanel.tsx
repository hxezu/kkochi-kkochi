import Image from "next/image";
import CategorySelect from "./CategorySelect";
import onboardImg from "@/assets/images/onboarding.svg";

interface WelcomePanelProps {
  onSelectCategory: (category: string) => void;
}

export default function WelcomePanel({ onSelectCategory }: WelcomePanelProps) {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-5">
      <div className="w-44 h-36 relative">
        <Image
          src={onboardImg}
          alt="온보딩 로고 이미지"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      <p className="text-2xl font-santokki">
        오늘은 <span className="text-(--color-primary-200)">꼬치꼬치</span>가
      </p>
      <p className="text-2xl font-santokki">
        어떤 <span className="text-(--color-primary-200)">면접 질문</span>을
        캐물어볼까요 ?
      </p>

      <CategorySelect onSelectCategory={onSelectCategory} />
    </div>
  );
}
