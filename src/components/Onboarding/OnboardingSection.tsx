import CategorySelect from "./CategorySelect";
import OnboardingLogo from "./OnboardingLogo";
import OnboardingSlogan from "./OnboardingSlogan";

interface OnboardingSectionProps {
  onSelectCategory: (category: string) => void;
}

export default function OnboardingSection({
  onSelectCategory,
}: OnboardingSectionProps) {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-6">
      <OnboardingLogo />
      <OnboardingSlogan />
      <CategorySelect onSelectCategory={onSelectCategory} />
    </div>
  );
}
