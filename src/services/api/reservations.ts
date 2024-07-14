import { PlaceReservation, PlaceReservationBody } from "@/utils/types";
import { fetchApi } from "./utils";
import { toast } from "react-toastify";

export async function getPlaceReservationById(
  id: number
): Promise<PlaceReservation> {
  const { data, error } = await fetchApi(`/solicitacao/espaco/${id}`, {
    method: "GET",
  });

  if (error) {
    toast.error("Erro ao visualizar reserva: " + error);
  }

  return data;
}

export async function getPlaceReservations(): Promise<PlaceReservation[]> {
  const { data, error } = await fetchApi("/solicitacao/espaco/all", {
    method: "GET",
  });

  if (error) {
    return new Promise(() => null);
  }

  return data;
}

export async function updatePlaceReservation(
  id: number,
  status: string
): Promise<PlaceReservation> {
  const { data, error } = await fetchApi(`/solicitacao/espaco/${id}`, {
    data: status,
    method: "PUT",
  });

  if (error) {
    toast.error("Erro ao atualizar reserva: " + error);
  }

  return data;
}

export async function createPlaceReservation(
  reservation: PlaceReservationBody
): Promise<PlaceReservation> {
  const { data, error } = await fetchApi(`/solicitacao/espaco`, {
    method: "POST",
    data: reservation,
  });

  if (error) {
    toast.error("Erro ao criar reserva: " + error);
  } else {
    toast.success("A sua solicitação foi enviada para o dono do espaço 😀");
  }

  return data;
}
