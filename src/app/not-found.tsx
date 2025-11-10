import Image from "next/image";
import Link from "next/link";
import notfoundImg from "@/assets/images/404-img.png";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 gap-6">
      <Image
        src={notfoundImg}
        width={240}
        height={100}
        alt="404 이미지"
        unoptimized
        priority
        className="translate-x-6"
      />
      <p className="text-(--color-gray-400)">
        요청하신 페이지가 존재하지 않거나 이동되었어요.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-(--color-primary-200) text-white rounded-lg transition-transform duration-300 hover:scale-105"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
