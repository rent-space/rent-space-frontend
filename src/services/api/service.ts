import { ServicePayload } from "@/utils/types";
import { fetchApi } from "./utils";
import { toast } from "react-toastify";

export async function createService(service: ServicePayload): Promise<any> {
  const { data, error } = await fetchApi("/servico", {
    data: service,
    method: "POST",
  });

  if (error) {
    toast.error("Erro ao criar serviço: " + error);
  } else {
    toast.success("Serviço criado com sucesso!");
  }

  return data;
}

export async function getServiceTypes(): Promise<string[]> {
  const { data, error } = await fetchApi("/servico/tipos", {
    method: "GET",
  });

  if (error) {
    toast.error("Erro ao buscar tipos de serviço: " + error);
  }

  return data;
}
