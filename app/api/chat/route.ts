import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import { NextRequest, NextResponse } from "next/server";

import { getApiConfig, getChatEndpoit } from "../apiConfig";

export const runtime = "edge";

export interface NcnPortalContent {
  type: string;
  text: string;
}

export interface NcnPortalMessage {
  role: string;
  content: Array<NcnPortalContent>;
}

export interface Message {
  role: string;
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, input, address } = (await req.json()) as {
      messages: Message[];
      input: string;
      address: string;
    };
    const messagesWithHistory = [...messages, { content: input, role: "user" }];

    const { apiUrl } = getApiConfig();
    const stream = await getClaudeStream(apiUrl, messagesWithHistory, address);
    return new NextResponse(stream, {
      headers: { "Content-Type": "text/event-stream" },
    });
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

const getClaudeStream = async (
  apiUrl: string,
  messages: Message[],
  address: string,
) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const ncnPortalMessages: Array<NcnPortalMessage> = [];
  messages.forEach((message) => {
    const ncnPortalMessage: NcnPortalMessage = {
      role: message.role,
      content: [{ type: "text", text: message.content }],
    };
    ncnPortalMessages.push(ncnPortalMessage);
  });

  const endpoint = getChatEndpoit(address);
  const url = new URL(`${apiUrl}${endpoint}`);

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(ncnPortalMessages),
  });

  if (res.status !== 200) {
    const statusText = res.statusText;
    const responseBody = await res.text();
    console.error(`Claude API response error: ${responseBody}`);
    throw new Error(
      `The Claude API has encountered an error with a status code of ${res.status} ${statusText}: ${responseBody}`,
    );
  }

  return new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const text = data;
            if (text !== undefined) {
              const queue = encoder.encode(text);
              controller.enqueue(queue);
            } else {
              console.error("Received undefined content:", text);
            }
          } catch (e) {
            console.error("Error parsing event data:", e);
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      /* eslint-disable @typescript-eslint/no-explicit-any */
      for await (const chunk of res.body as any) {
        const str = decoder.decode(chunk).replace("[DONE]\n", "[DONE]\n\n");
        parser.feed(str);
      }
    },
  });
};
