import { toast } from "react-toastify";
import { fetchApi } from "./utils";

export async function createExpressAccount(
  email: string
): Promise<any> {
  const { data, error } = await fetchApi(`/charge/create-express-account`, {
    method: "POST",
    data: { email }
  });

  if (error) {
    toast.error("Erro ao realizar criação de conta: " + error);
    throw new Error(error);
  }

  return data;
}

export async function createPaymentIntent(
  amount: string,
  connectedAccountId: string
): Promise<any> {
  const { data, error } = await fetchApi(`/charge/create-payment`, {
    method: "POST",
    data: { amount, connectedAccountId }
  });

  if (error) {
    toast.error("Erro ao realizar pagamento: " + error);
    throw new Error(error);
  }

  return data;
}