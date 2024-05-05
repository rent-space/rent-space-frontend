import { AllSpaces, Space, SpacePayload } from "@/utils/types";
import { fetchApi } from "./utils";

export async function createSpace(space: SpacePayload): Promise<Space> {
  const { data } = await fetchApi("/espaco", {
    data: space,
    method: "POST",
  });

  return data;
}

export async function getSpaces(): Promise<AllSpaces> {
  const { data, error } = await fetchApi(`/espaco/allPlaces`, {
    method: "GET",
  });

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getSpace(id: number): Promise<Space> {
  const { data, error } = await fetchApi(`/espaco/${id}`, {
    method: "GET",
  });

  if (error) {
    console.error(error);
  }

  return data;
}

export async function deleteSpace(id:number): Promise<Space> {
  const { data, error } = await fetchApi(`/espaco/${id}`, {
    method: "DELETE",
  });

  if (error) {
    console.error(error);
  }

  return data;
}
