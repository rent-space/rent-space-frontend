import { AllSpaces, Space, SpacePayload } from "@/utils/types";
import { fetchApi } from "./utils";
import { toast } from "react-toastify";

export async function createSpace(space: SpacePayload): Promise<Space> {
  const { data, error } = await fetchApi("/espaco", {
    data: space,
    method: "POST",
  });

  if (error) {
    toast.error("Erro ao criar espaço: " + error);
  } else {
    toast.success("Espaço criado com sucesso!");
  }

  return data;
}

export async function editSpace(space: SpacePayload): Promise<Space> {
  const { data, error } = await fetchApi("/espaco", {
    data: space,
    method: "PUT",
  });

  if (error) {
    toast.error("Erro ao editar espaço: " + error);
  } else {
    toast.success("Espaço editar com sucesso!");
  }

  return data;
}

export async function getSpaces(): Promise<AllSpaces> {
  const { data, error } = await fetchApi(`/espaco/allPlaces`, {
    method: "GET",
  });

  if (error) {
    toast.error("Erro ao listar espaços: " + error);
  }

  return data;
}

export async function getSpace(id: number): Promise<Space> {
  const { data, error } = await fetchApi(`/espaco/${id}`, {
    method: "GET",
  });

  if (error) {
    toast.error("Erro ao visualizar espaço: " + error);
  }

  return data;
}
