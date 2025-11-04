import Image from "next/image";

export default function LoadingBubble() {
  return (
    <div className="max-w-3xl space-y-4">
      <Image src="/logo.svg" alt="챗봇 이미지" width={32} height={30} />
      <div className="flex justify-start">
        <div className="bg-white p-4 rounded-xl min-w-[60px]">
          <div className="flex gap-1 items-center justify-center">
            <span
              className="inline-block w-1 h-1 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "0.6s" }}
            />
            <span
              className="inline-block w-1 h-1 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms", animationDuration: "0.6s" }}
            />
            <span
              className="inline-block w-1 h-1 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms", animationDuration: "0.6s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
