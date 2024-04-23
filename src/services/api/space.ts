import { Space, SpacePayload } from "@/utils/types";
import { fetchApi } from "./utils";

export async function createSpace(space: SpacePayload): Promise<Space> {
  const { data, error } = await fetchApi("/espaco", {
    data: space,
    method: "POST",
  });

  if (error) {
    console.log(error);
  }

  return data;
}

export async function getSpaces(): Promise<Space[]> {
  const { data, error } = await fetchApi(`/espaco/allPlaces}`, {
    method: "GET",
  });

  if (error) {
    console.error(error);
  }

  return data;
}
