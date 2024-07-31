import ServiceForm from "@/components/ServiceForm";
import { editService, getService } from "@/services/api";
import { Service, ServicePayload } from "@/utils/types";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditService() {
  const router = useRouter();

  const [id, setId] = useState<number>();

  const [service, setService] = useState<Service | undefined>(undefined);

  useEffect(() => {
    id && getService(id).then((response) => response && setService(response));
  }, [id]);

  useEffect(() => {
    setId(parseInt(router.query.id as string));
  }, [router.query.id]);

  const handleSubmit = (service: FormData, id?: number) => {
    return editService(service, id ?? -1).then((res) => {
      res && router.push(`/service/${res.id}`);
    });
  };

  return <ServiceForm service={service} handleSubmit={handleSubmit} />;
}
