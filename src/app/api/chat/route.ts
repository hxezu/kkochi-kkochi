import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req: NextRequest) {
  const { category, message } = await req.json();

  const systemPrompt = `
당신은 프론트엔드 개발자 면접관입니다.
- 사용자가 답변하지 않은 경우: 새로운 질문만 제시합니다.
- 사용자가 답변한 경우: 답변을 분석하고 보완 설명, 꼬리질문 1~2개를 제시합니다.
- 꼬리질문이 끝나면 다음 주제의 새로운 질문으로 자연스럽게 넘어갑니다.
- 항상 **한국어**로 간결하고 논리적으로 답합니다.
[현재 카테고리] ${category}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash", // 최신 버전 추천
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message || "" }, // 메시지가 없으면 빈 문자열
      ],
    });

    const answer =
      response.choices?.[0]?.message?.content || "응답이 없습니다 😅";
    return NextResponse.json({ answer });
  } catch (err: unknown) {
    let errorMessage = "알 수 없는 오류가 발생했습니다.";

    if (err instanceof Error) {
      errorMessage = err.message;
      console.error("Google Gemini error:", err.message);
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
