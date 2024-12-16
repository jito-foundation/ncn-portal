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
    const messagesWithHistory = [...messages]

    const { apiUrl, apiKey } = getApiConfig()
    const response = await fetchApiResponse(apiUrl, apiKey, input, messagesWithHistory)
    return NextResponse.json(response)
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
  
  apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  apiKey = process.env.OPENAI_API_KEY || ''

  return { apiUrl, apiKey }
}

const fetchApiResponse = async (
  apiUrl: string,
  apiKey: string,
  input: string,
  messages: Message[]
) => {
  const res = await fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'api-key': `${apiKey}`,
    },
    method: 'POST',
    body: JSON.stringify({
      prompt: input,
      chat_history: messages,
    }),
  });

  if (res.status !== 200) {
    const statusText = res.statusText;
    const responseBody = await res.text();
    console.error(`API response error: ${responseBody}`);
    throw new Error(
      `API error: ${res.status} ${statusText}: ${responseBody}`
    );
  }

  const json = await res.json();
  return json;
};

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
//       messages: messages,
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

//           console.log(data)

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
