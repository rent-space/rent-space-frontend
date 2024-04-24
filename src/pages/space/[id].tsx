import { Header } from "@/components/Header";
import { Page } from "@/components/Page";
import { DetailsSpace } from "@/components/DetailsSpace";
import { DetailsCard } from "@/components/DetailsCard";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Space } from "@/utils/types";
import { getSpace } from "@/services/api/space";

export default function DetailsPageSpace() {
  const [space, setSpace] = useState<Space | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    const id = parseInt(router.query.id as string);
    getSpace(id).then((response) => response && setSpace(response));
  }, [router.query.id]);

  return (
    <>
      <Header justify="center" navigateBackTo="/spaces" />
      <Page type="form">
        {space && (
          <DetailsSpace space={space}>
            <DetailsCard owner={space.owner} />
          </DetailsSpace>
        )}
      </Page>
      <Footer />
    </>
  );
}
