import { NextRequest, NextResponse } from "next/server";
import { getApiConfig } from "../apiConfig";

export async function POST(req: NextRequest) {
  try {
    const { requestType, address } = (await req.json()) as {
      requestType: string;
      address: string;
    };

    const { apiUrl } = getApiConfig();

    switch (requestType) {
      case "login": {
        const proof = await getProof(apiUrl, address);
        return NextResponse.json(proof);
      }

      case "unlockChatbot": {
        const response = await unlockChatbot(apiUrl, address);
        return NextResponse.json(response);
      }
    }
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
  const url = `${apiUrl}/rest/merkle_tree/get/${address}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (res.status !== 200) {
    const statusText = res.statusText;
    const responseBody = await res.text();
    throw new Error(
      `NCN Portal has encountered an error with a status code of ${res.status} ${statusText}: ${responseBody}`,
    );
  }

  const json = await res.json();
  return json;
};

const unlockChatbot = async (apiUrl: string, address: string) => {
  const url = `${apiUrl}/rest/whitelist/request_access`;
  const data = {
    pubkey: address,
  };
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  if (res.status !== 200) {
    const statusText = res.statusText;
    const responseBody = await res.text();
    throw new Error(
      `NCN Portal has encountered an error with a status code of ${res.status} ${statusText}: ${responseBody}`,
    );
  }

  const json = await res.json();
  return json;
};