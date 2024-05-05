import SpaceForm from "@/components/SpaceForm";
import { getSpace } from "@/services/api/space";
import { Space } from "@/utils/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditSpace() {
  const router = useRouter();

  const [id, setId] = useState<number>();

  const [space, setSpace] = useState<Space | undefined>(undefined);

  useEffect(() => {
    id && getSpace(id).then((response) => response && setSpace(response));
  }, [id]);

  useEffect(() => {
    setId(parseInt(router.query.id as string));
  }, [router.query.id]);

  const handleSubmit = () => {
    console.log("edit");
  };

  return (
    <>{space && <SpaceForm space={space} handleSubmit={handleSubmit} />}</>
  );
}
