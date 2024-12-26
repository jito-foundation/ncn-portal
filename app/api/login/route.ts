import { NextRequest, NextResponse } from "next/server";
import { getApiConfig } from "../apiConfig";

export async function GET(req: NextRequest) {
    try {
        const { address } = (await req.json()) as {
            address: string;
        };

        const { apiUrl } = getApiConfig();
        const proof = await getProof(apiUrl, address);
        return new NextResponse(proof);
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

const getProof = async (apiUrl: string, address: string) => {
    let url = `${apiUrl}/rest/merkle_tree/get/${address}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  
    if (res.status !== 200) {
      const statusText = res.statusText;
      const responseBody = await res.text();
      console.error(`Claude API response error: ${responseBody}`);
      throw new Error(
        `The Claude API has encountered an error with a status code of ${res.status} ${statusText}: ${responseBody}`,
      );
    }

    const json = await res.json();
    return json.data;
}