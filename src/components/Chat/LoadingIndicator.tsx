import Image from "next/image";

export default function LoadingIndicator() {
  return (
    <div className="max-w-3xl space-y-4">
      <Image src="/logo.svg" alt="로딩중" width={32} height={30} />
      <div className="flex justify-start">
        <div className="bg-white p-4 rounded-xl min-w-[60px]">
          <div className="flex gap-1 items-center justify-center">
            {[0, 150, 300].map((delay) => (
              <span
                key={delay}
                className="inline-block w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${delay}ms`,
                  animationDuration: "0.6s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
