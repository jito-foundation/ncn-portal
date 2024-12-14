import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export interface Message {
  role: string
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, messages, input } = (await req.json()) as {
      prompt: string
      messages: Message[]
      input: string
    }
    const messagesWithHistory = [
      { content: prompt, role: 'system' },
      ...messages,
      { content: input, role: 'user' }
    ]

    const { apiUrl, apiKey, model } = getApiConfig();
    const stream = await getStreamWebSocket(apiUrl, apiKey, model, messagesWithHistory)
    return new NextResponse(stream, {
      headers: { 'Content-Type': 'text/event-stream' }
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

const getApiConfig = () => {
  let apiUrl: string
  let apiKey: string
  let model: string
  
  apiUrl = process.env.API_BASE_URL || '';
  apiKey = process.env.OPENAI_API_KEY || ''
  model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo'

  return { apiUrl, apiKey, model }
}

// const getStream = async (
//   apiUrl: string,
//   apiKey: string,
//   model: string,
//   messages: Message[]
// ) => {
//   const encoder = new TextEncoder()
//   const decoder = new TextDecoder()
//   const res = await fetch(apiUrl, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${apiKey}`,
//       'api-key': `${apiKey}`
//     },
//     method: 'POST',
//     body: JSON.stringify({
//       model: model,
//       frequency_penalty: 0,
//       max_tokens: 4000,
//       messages: messages,
//       presence_penalty: 0,
//       stream: true,
//       temperature: 0.5,
//       top_p: 0.95
//     })
//   })

//   if (res.status !== 200) {
//     const statusText = res.statusText
//     const responseBody = await res.text()
//     console.error(`OpenAI API response error: ${responseBody}`)
//     throw new Error(
//       `The OpenAI API has encountered an error with a status code of ${res.status} ${statusText}: ${responseBody}`
//     )
//   }

//   return new ReadableStream({
//     async start(controller) {
//       const onParse = (event: ParsedEvent | ReconnectInterval) => {
//         if (event.type === 'event') {
//           const data = event.data

//           if (data === '[DONE]') {
//             controller.close()
//             return
//           }

//           try {
//             const json = JSON.parse(data)
//             const text = json.choices[0]?.delta?.content
//             if (text !== undefined) {
//               const queue = encoder.encode(text)
//               controller.enqueue(queue)
//             } else {
//               console.error('Received undefined content:', json)
//             }
//           } catch (e) {
//             console.error('Error parsing event data:', e)
//             controller.error(e)
//           }
//         }
//       }

//       const parser = createParser(onParse)

//       for await (const chunk of res.body as any) {
//         // An extra newline is required to make AzureOpenAI work.
//         const str = decoder.decode(chunk).replace('[DONE]\n', '[DONE]\n\n')
//         parser.feed(str)
//       }
//     }
//   })
// }

const getStreamWebSocket = (
  apiUrl: string,
  apiKey: string,
  model: string,
  messages: Message[]
): ReadableStream<Uint8Array> => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream({
    start(controller) {
      const socket = new WebSocket(apiUrl);

      socket.onopen = () => {
        console.log("WebSocket connection established.");

        // Send initial message to backend
        socket.send("Hello2"
        //   JSON.stringify({
        //     model: model,
        //     frequency_penalty: 0,
        //     max_tokens: 4000,
        //     messages: messages,
        //     presence_penalty: 0,
        //     stream: true,
        //     temperature: 0.5,
        //     top_p: 0.95,
        //     apiKey: apiKey,
        //   })
        );
        // controller.close();
      };

      socket.onmessage = (event) => {
        try {
          console.log(event.data);
          const data = event.data;


          if (data === "[DONE]") {
            controller.close();
            return;
          }

          // const text = data.choices[0]?.delta?.content;
          // if (text !== undefined) {
            const queue = encoder.encode(event.data);
            controller.enqueue(queue);
          // } else {
          //   console.error("Received undefined content:", data);
          // }
        } catch (e) {
          console.error("Error parsing WebSocket message:", e);
          controller.error(e);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        controller.error(new Error("WebSocket encountered an error."));
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed.");
        controller.close();
      };
    },
  });
};