export const getApiConfig = () => {
  const apiUrl =
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1` || "http://localhost:8080";

  return { apiUrl };
};
