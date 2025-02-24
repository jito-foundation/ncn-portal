export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const API_VERSION = "v1";

export const getApiConfig = () => {
  const apiUrl =
    `${API_BASE_URL}/api/${API_VERSION}/user` || "http://localhost:8080";

  return { apiUrl };
};

export const getSiwsMessageEndpoint = (address: string): string => {
  return `/whitelist/${address}/siws_message`;
}

export const validateAndVerifyEndpoint = (address: string): string => {
  return `/whitelist/${address}/validate_and_verify`;
}

export const requestAccessEndpoint = (): string => {
  return `/whitelist/request_access`;
}

export const getAccessStatusEndpoint = (address: string): string => {
  return `/whitelist/${address}/access_status`
}

export const getChatEndpoit = (address: string): string => {
  return `/chat/${address}`
}