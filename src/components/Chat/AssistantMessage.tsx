import { formatTime } from "@/utils/formatTime";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";

interface AssistantMessageProps {
  text: string;
  timestamp: number;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function AssistantMessage({
  text,
  timestamp,
}: AssistantMessageProps) {
  const timeString = formatTime(timestamp);

  const components: Components = {
    // 코드 블록
    code({ inline, className, children }: CodeProps) {
      const match = /language-(\w+)/.exec(className || "");
      const codeString = String(children).replace(/\n$/, "");

      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: "0.5rem 0",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-100 text-(--color-primary-200) px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    },
    // 볼드
    strong({ children }) {
      return <strong className="font-bold text-gray-900">{children}</strong>;
    },
    // 이탤릭
    em({ children }) {
      return <em className="italic text-gray-700">{children}</em>;
    },
    // 링크
    a({ href, children }) {
      return (
        <a
          href={href}
          className="text-blue-600 hover:text-blue-800 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
    // 리스트
    ul({ children }) {
      return (
        <ul className="list-disc list-inside my-2 space-y-1 ml-4">
          {children}
        </ul>
      );
    },
    ol({ children }) {
      return (
        <ol className="list-decimal list-inside my-2 space-y-1 ml-4">
          {children}
        </ol>
      );
    },
    // 단락
    p({ children }) {
      return <p className="my-2 leading-relaxed">{children}</p>;
    },
    // 제목
    h1({ children }) {
      return (
        <h1 className="text-xl font-bold my-3 text-gray-900">{children}</h1>
      );
    },
    h2({ children }) {
      return (
        <h2 className="text-lg font-bold my-3 text-gray-900">{children}</h2>
      );
    },
    h3({ children }) {
      return (
        <h3 className="text-base font-bold my-2 text-gray-900">{children}</h3>
      );
    },
    // 구분선
    hr() {
      return <hr className="my-4 border-gray-300" />;
    },
    // 인용구
    blockquote({ children }) {
      return (
        <blockquote className="border-l-4 border-gray-400 pl-4 my-2 italic text-gray-600">
          {children}
        </blockquote>
      );
    },
  };

  return (
    <div className="space-y-4">
      <Image src="/logo.svg" alt="챗봇 이미지" width={32} height={30} />
      <div className="flex justify-start space-x-2">
        <div className="bg-white text-gray-800 text-[13px] md:text-[15px] px-4 py-2 md:p-4 rounded-xl max-w-[70%] lg:max-w-[540px]">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {text}
          </ReactMarkdown>
        </div>
        <span className="text-[10px] md:text-xs text-gray-400 flex items-end">
          {timeString}
        </span>
      </div>
    </div>
  );
}
