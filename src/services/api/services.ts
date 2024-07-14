import { AllServices, Service, ServicePayload } from "@/utils/types";
import { fetchApi } from "./utils";
import { toast } from "react-toastify";

export async function getServices(): Promise<AllServices> {
    const {data, error} = await fetchApi(`/servico`, {
        method: "GET"
    })

    if (error) {
        toast.error("Erro ao recuperar serviços: " + error);
    }

    return data;
}