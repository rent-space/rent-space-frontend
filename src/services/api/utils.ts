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
  try {
    const response = await api({
      url,
      method: options?.method || "GET",
      data: options?.data,
      params: options?.params,
      headers: {
        "Content-Type": contentType,
        crossDomain: true,
      },
    });

    return { data: response.data, error: null };
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error:
        (error?.response?.data?.message as string) || DEFAULT_ERROR_MESSAGE,
    };
  }
}
