import type { Metadata } from "next";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import AppLayout from "@/components/Layout/AppLayout";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "꼬치꼬치 - FE 개발자들의 AI 면접관",
    template: "%s | 꼬치꼬치",
  },
  description:
    "프론트엔드 개발자를 위한 AI 면접관 꼬치꼬치입니다. JavaScript, React, CS 등 다양한 주제로 면접을 준비하세요.",
  keywords: [
    "프론트엔드",
    "면접",
    "JavaScript",
    "React",
    "HTML/CSS",
    "Next.js",
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
    url: "https://kkochi-kkochi.vercel.app/",
    title: "꼬치꼬치 - 개발자를 위한 AI 면접관",
    description:
      "프론트엔드 개발자를 위한 AI 면접관 꼬치꼬치입니다. JavaScript, React, CS 등 다양한 주제로 면접을 준비하세요.",
    siteName: "꼬치꼬치",
    images: [
      {
        url: "https://kkochi-kkochi.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "꼬치꼬치 프론트엔드 개발자를 위한 AI 면접관",
      },
    ],
  },
  alternates: {
    canonical: "https://kkochi-kkochi.vercel.app/",
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
        <Toaster position="top-center" />
        <AppLayout>{children}</AppLayout>
        <Analytics />
      </body>
    </html>
  );
}
