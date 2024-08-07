import { UserType } from "./../../utils/types/user";
import {
  PlaceReservation,
  PlaceReservationBody,
  ServiceReservation,
  ServiceReservationBody,
} from "@/utils/types";
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

export async function getPlaceReservations(
  userType: string | undefined
): Promise<PlaceReservation[]> {
  const { data, error } = await fetchApi("/solicitacao/espaco/all", {
    method: "GET",
  });

  if (userType === "PLACE_OWNER" && error) {
    toast.error("Erro ao listar reservas de espaço");
    console.error(error);
  }

  return data;
}

export async function getServiceReservations(
  userType: string | undefined
): Promise<PlaceReservation[]> {
  const { data, error } = await fetchApi("/solicitacao/servico/all", {
    method: "GET",
  });

  if (userType === "SERVICE_OWNER" && error) {
    toast.error("Erro ao listar reservas de serviço");
    console.error(error);
  }

  return data;
}

export async function updateServiceReservation(
  id: number,
  status: string
): Promise<PlaceReservation> {
  const { data, error } = await fetchApi(`/solicitacao/servico/${id}`, {
    data: status,
    method: "PUT",
  });

  if (error) {
    toast.error("Erro ao atualizar reserva: " + error);
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
    toast.error("Erro ao solicitar reserva: " + error);
  } else {
    toast.success("A sua solicitação foi enviada para o dono do serviço 😀");
  }

  return data;
}

export async function createServiceReservation(
  reservation: ServiceReservationBody
): Promise<ServiceReservation> {
  const { data, error } = await fetchApi(`/solicitacao/servico`, {
    method: "POST",
    data: reservation,
  });

  if (error) {
    toast.error("Erro ao solicitar reserva: " + error);
  } else {
    toast.success("A sua solicitação foi enviada para o dono do serviço 😀");
  }

  return data;
}
