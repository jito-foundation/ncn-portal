/* eslint-disable  @typescript-eslint/no-explicit-any */
import { UiWalletAccount } from "@wallet-standard/react";
import { NextRequest, NextResponse } from "next/server";

import {
  getAccessStatusEndpoint,
  getApiConfig,
  getSiwsMessageEndpoint,
  requestAccessEndpoint,
  validateAndVerifyEndpoint,
} from "../apiConfig";

export async function POST(req: NextRequest) {
  try {
    const { requestType, url, address, account, signedMessage, signature } =
      (await req.json()) as {
        requestType: string;
        url: string | undefined;
        address: string;
        account: UiWalletAccount | undefined;
        signedMessage: Uint8Array<ArrayBufferLike> | undefined;
        signature: Uint8Array<ArrayBufferLike> | undefined;
      };

    const { apiUrl } = getApiConfig();

    switch (requestType) {
      case "getWhitelist": {
        const response = await getWhitelist(apiUrl, address);
        return NextResponse.json(response);
      }

      case "unlockChatbot": {
        const response = await unlockChatbot(apiUrl, address);
        return NextResponse.json(response);
      }

      case "getSiwsMessage": {
        const response = await getSiwsMessage(apiUrl, address, url!);
        return NextResponse.json(response);
      }

      case "validateAndVerify": {
        const response = await validateAndVerify(
          apiUrl,
          url!,
          account,
          signedMessage,
          signature,
        );
        return NextResponse.json(response);
      }
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

const getWhitelist = async (apiUrl: string, address: string) => {
  const endpoint = getAccessStatusEndpoint(address);
  const url = new URL(`${apiUrl}${endpoint}`);

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
  const endpoint = requestAccessEndpoint();
  const url = new URL(`${apiUrl}${endpoint}`);
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

const getSiwsMessage = async (apiUrl: string, address: string, url: string) => {
  const endpoint = getSiwsMessageEndpoint(address);
  const requestUrl = new URL(`${apiUrl}${endpoint}`);

  const data = {
    url,
  };
  const res = await fetch(requestUrl, {
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

const validateAndVerify = async (
  apiUrl: string,
  url: string,
  accountData: UiWalletAccount | undefined,
  signedMessageData: Uint8Array<ArrayBufferLike> | undefined,
  signatureData: Uint8Array<ArrayBufferLike> | undefined,
) => {
  const endpoint = validateAndVerifyEndpoint(accountData!.address!);
  const requestUrl = new URL(`${apiUrl}${endpoint}`);
  requestUrl.searchParams.set("url", url);

  const convertPublicKeyToArray = (publicKey: any) => {
    if (!publicKey) return [];
    return Object.keys(publicKey)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => publicKey[key]);
  };

  const getByteArray = (input: any) => {
    if (!input) return [];
    if (input instanceof Uint8Array) return Array.from(input);
    if (input.data) return Array.from(input.data);
    return [];
  };

  const account = {
    publicKey: convertPublicKeyToArray(accountData?.publicKey),
  };
  const signedMessage = getByteArray(signedMessageData);
  const signature = getByteArray(signatureData);
  const data = {
    account,
    signedMessage,
    signature,
  };

  const res = await fetch(requestUrl, {
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
