import callApi from ".";
import { UserProfile } from "../../common.types";

export async function getUser(email: string): Promise<UserProfile> {
  const userData = await callApi(`/user/${email}`);

  return userData;
}

export async function createUser(user: UserProfile, id: string): Promise<UserProfile> {
  const userData = await callApi(`/user/${id}`, user, "POST");

  return userData;
}