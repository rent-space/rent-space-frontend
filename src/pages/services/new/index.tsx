import ServiceForm from "@/components/ServiceForm";
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
    console.log("submitting...");
    return new Promise((resolve, reject) => {
      resolve("success");
    });
  };

  return <ServiceForm handleSubmit={handleSubmit} />;
}
