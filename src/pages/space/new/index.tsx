import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { createSpace } from "@/services/api/space";

import SpaceForm from "@/components/SpaceForm";
import { SpacePayload } from "@/utils/types";

export interface SpaceForm {
  title: string;
  description: string;
  media: string[];
  address: string;
  neighborhood: string;
  city: string;
  pricePerHour: number;
  maximumCapacity: number;
  complement: string;
  zipCode: string;
}

export default function SpaceNew() {
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const handleSubmit = (space: SpacePayload) => {
    return createSpace(space).then((response) => {
      response && router.push(`/space/${response.id}`);
    });
  };

  return <SpaceForm space={{} as any} handleSubmit={handleSubmit} />;
}
