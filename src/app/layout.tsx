import type { Metadata } from "next";
import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import ChatSectionHeader from "@/components/Chatroom/ChatSectionHeader";

export const metadata: Metadata = {
  title: {
    default: "꼬치꼬치 - FE 면접 준비 챗봇",
    template: "%s | 꼬치꼬치",
  },
  description:
    "프론트엔드 개발자를 위한 CS 면접 연습 챗봇입니다. JavaScript, React, TypeScript 등 다양한 주제로 면접을 준비하세요.",
  keywords: [
    "프론트엔드",
    "면접",
    "챗봇",
    "CS",
    "JavaScript",
    "React",
    "TypeScript",
    "코딩 면접",
    "기술 면접",
  ],
  authors: [{ name: "꼬치꼬치" }],
  creator: "꼬치꼬치",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://your-domain.com",
    title: "꼬치꼬치 - 프론트엔드 면접 준비 챗봇",
    description:
      "프론트엔드 개발자를 위한 CS 면접 연습 챗봇입니다. JavaScript, React, TypeScript 등 다양한 주제로 면접을 준비하세요.",
    siteName: "꼬치꼬치",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "꼬치꼬치 프론트엔드 면접 챗봇",
      },
    ],
  },

  verification: {
    // google: "your-google-verification-code", // Google Search Console 인증 코드
    // yandex: "your-yandex-verification-code",
    // other: "your-other-verification-code",
  },
  alternates: {
    canonical: "https://your-domain.com", // 실제 도메인으로 변경
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <ChatSectionHeader />
            <main className="flex-1 overflow-hidden">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
