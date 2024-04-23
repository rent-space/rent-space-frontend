import axios, { AxiosRequestConfig } from "axios";

const DEFAULT_ERROR_MESSAGE = "Erro ao conectar com o servidor!";
const API_BASE_URL = process.env.NEXT_PUBLIC_APPLICATION_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

interface FetchOptions {
  data?: unknown;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: AxiosRequestConfig["params"];
  isUrlEncoded?: boolean;
}

export async function fetchApi(url: string, options?: FetchOptions) {
  let contentType =
    options?.data instanceof FormData
      ? "multipart/form-data"
      : "application/json";

  if (options?.isUrlEncoded) {
    contentType = "application/x-www-form-urlencoded";
  }
  console.log("contentType", contentType);
  try {
    const response = await api({
      url,
      method: options?.method || "GET",
      data: options?.data,
      params: options?.params,
      headers: {
        "Content-Type": contentType,
      },
    });
    console.log("response", response);

    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error:
        (error?.response?.data?.errorMessage as string) ||
        DEFAULT_ERROR_MESSAGE,
    };
  }
}
