import Image from "next/image";
import onboardImg from "@/assets/images/onboarding.svg";

export default function OnboardingLogo() {
  return (
    <div className="w-34 h-26 md:w-44 md:h-36 relative">
      <Image
        src={onboardImg}
        alt="온보딩 로고 이미지"
        fill
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
}
