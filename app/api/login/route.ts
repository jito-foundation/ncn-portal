/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { getApiConfig } from "../apiConfig";
import { UiWalletAccount } from "@wallet-standard/react";

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
  const url = `${apiUrl}/rest/whitelist/${address}/access_status`;
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

const getSiwsMessage = async (
  apiUrl: string,
  address: string,
  url: string,
) => {
  const requestUrl = new URL(`${apiUrl}/rest/whitelist/${address}/siws_message`);

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
  const requestUrl = new URL(`${apiUrl}/rest/whitelist/${accountData?.address}/validate_and_verify`);
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
