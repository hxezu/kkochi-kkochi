import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

type OllamaResponse = {
  response: string;
};

export async function POST(req: NextRequest) {
  const { category, message, context } = (await req.json()) as {
    category: string;
    message: string;
    context: Array<{ role: "user" | "bot"; content: string }>;
  };

  const systemPrompt = `
당신은 프론트엔드 CS 면접관입니다.
카테고리: ${category}.
질문에 대한 답변과 꼬리질문 1~2개를 제시하세요.
`;

  try {
    const response = await axios.post<OllamaResponse>(
      "http://localhost:11434/api/generate",
      {
        model: "phi3:mini",
        prompt: `${systemPrompt}\n질문: ${message}`,
        max_tokens: 300,
      }
    );

    const answer = response.data.response;
    return NextResponse.json({ answer });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data || error.message },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
