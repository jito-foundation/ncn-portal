import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export interface Message {
  role: string;
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, input } = (await req.json()) as {
      prompt: string;
      messages: Message[];
      input: string;
    };
    const messagesWithHistory = [...messages];

    const { apiUrl, apiKey } = getApiConfig();
    const response = await fetchApiResponse(
      apiUrl,
      apiKey,
      input,
      messagesWithHistory,
    );
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

const getApiConfig = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://139.59.249.7:8080/prompt";
  const apiKey = process.env.OPENAI_API_KEY || "";

  return { apiUrl, apiKey };
};

const fetchApiResponse = async (
  apiUrl: string,
  apiKey: string,
  input: string,
  messages: Message[],
) => {
  const res = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "api-key": `${apiKey}`,
    },
    method: "POST",
    body: JSON.stringify({
      prompt: input,
      chat_history: messages,
    }),
  });

  if (res.status !== 200) {
    const statusText = res.statusText;
    const responseBody = await res.text();
    console.error(`API response error: ${responseBody}`);
    throw new Error(`API error: ${res.status} ${statusText}: ${responseBody}`);
  }

  const json = await res.json();
  return json;
};
