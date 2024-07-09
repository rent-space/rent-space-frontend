import ServiceForm from "@/components/ServiceForm";
import { createService } from "@/services/api";
import { ServicePayload } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ServiceNew() {
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const handleSubmit = (service: ServicePayload) => {
    console.log("submitting!", service);
    return createService(service).then((response) => {
      response && router.push("/services");
    });
  };

  return <ServiceForm handleSubmit={handleSubmit} />;
}
