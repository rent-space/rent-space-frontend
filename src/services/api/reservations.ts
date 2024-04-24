import { PlaceReservation } from "@/utils/types";
import { fetchApi } from "./utils";

export async function getPlaceReservationById(id: number): Promise<PlaceReservation> {
  const { data, error } = await fetchApi(`/solicitacao/espaco/${id}`, {
    method: "GET"
  })

  if (error) console.log(error);

  return data;
}

export async function updatePlaceReservation(id: number, status: string): Promise<PlaceReservation> {
  const { data, error } = await fetchApi(`/solicitacao/espaco/${id}`, {
    data: status,
    method: "PUT"
  })

  if (error) console.log(error);

  return data;
}