import { User } from "@/utils/types";
import { fetchApi } from "./utils";

export async function getUser(email: string): Promise<User> {
  const { data, error } = await fetchApi(`/usuario/${email}`, {
    method: "GET",
  });

  if (error) {
    console.error(error);
  }

  return data;
}

export async function createUser(user: User): Promise<User> {
  const { data, error } = await fetchApi(`/usuario`, {
    data: user,
    method: "POST",
  });

  if (error) {
    console.error(error);
  }

  return data;
}
