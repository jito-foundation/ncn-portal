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

    const { apiUrl } = getApiConfig();
    const response = await fetchApiResponse(apiUrl, input, messagesWithHistory);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

const getApiConfig = () => {
  const apiUrl = "https://seal-app-m2hhp.ondigitalocean.app/prompt";

  return { apiUrl };
};

const fetchApiResponse = async (
  apiUrl: string,
  input: string,
  messages: Message[]
) => {
  const res = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
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
