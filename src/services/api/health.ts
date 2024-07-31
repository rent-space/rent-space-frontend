import { toast } from "react-toastify";
import { fetchApi } from "./utils";

export async function healthCheck() {
  const { error } = await fetchApi("/servico/tipos", {
    method: "GET",
  });

  if (error) {
    toast.error("Erro ao conectar com o servidor");
  }
}
