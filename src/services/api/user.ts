import { User } from "@/utils/types";
import { fetchApi } from "./utils";
import { toast } from "react-toastify";

export async function getUser(email: string): Promise<User> {
  const { data, error } = await fetchApi(`/usuario/${email}`, {
    method: "GET",
  });

  if (error) {
    toast.error("Erro ao carregar usuário: " + error);
  }

  return data;
}

export async function createUser(user: User): Promise<User> {
  const { data, error } = await fetchApi(`/usuario`, {
    data: user,
    method: "POST",
  });

  if (error) {
    toast.error("Erro ao criar usuário: " + error);
  } else {
    toast.success("Usuário criado com sucesso!");
  }

  return data;
}

export async function setUserAccountId(accountId: string, userId: string): Promise<User> {
  const { data, error } = await fetchApi(`/usuario/${userId}`, {
    data: { accountId },
    method: "PATCH",
  });

  if (error) {
    toast.error("Erro ao atualizar o usuário: " + error);
  }

  return data;
}
