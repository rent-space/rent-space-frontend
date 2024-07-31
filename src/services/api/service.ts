import { AllServices, Service, ServicePayload } from "@/utils/types";
import { fetchApi } from "./utils";
import { toast } from "react-toastify";

export async function createService(service: FormData): Promise<any> {
  const { data, error } = await fetchApi("/servico/create", {
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

export async function editService(
  service: FormData,
  serviceid: number
): Promise<Service> {
  const { data, error } = await fetchApi(`/servico/${serviceid}`, {
    data: service,
    method: "PUT",
  });

  if (error) {
    toast.error("Erro ao editar serviço: " + error);
  } else {
    toast.success("Serviço editado com sucesso!");
  }

  return data;
}

export async function getService(id: number): Promise<Service> {
  const { data, error } = await fetchApi(`/servico/${id}`, {
    method: "GET",
  });

  if (error) {
    toast.error("Erro ao buscar servico: " + error);
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

export async function getServices(): Promise<AllServices> {
  const { data, error } = await fetchApi(`/servico`, {
    method: "GET",
  });

  if (error) {
    toast.error("Erro ao recuperar serviços: " + error);
  }

  return data;
}

export async function deleteService(id: number): Promise<Service> {
  const { data, error } = await fetchApi(`/servico/${id}`, {
    method: "DELETE",
  });

  if (error) {
    console.error(error);
  }

  return data;
}
