import { Header } from "@/components/Header";
import { Page } from "@/components/Page";
import { DetailsSpace } from "@/components/DetailsSpace";
import { DetailsCard } from "@/components/DetailsCard";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Service } from "@/utils/types";
import DeleteModal from "@/components/DeleteModal";

import { ServiceLoading } from "@/components/ServiceLoading";
import { getService } from "@/services/api";
import { DetailsService } from "@/components/DetailsService";

export default function ServiceDetails() {
  const router = useRouter();

  const [id, setId] = useState<number>();
  const [service, setService] = useState<Service | undefined>(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  useEffect(() => {
    setId(parseInt(router.query.id as string));
  }, [router.query.id]);

  useEffect(() => {
    id && getService(id).then((response) => response && setService(response));
  }, [id]);

  return (
    <>
      {service && (
        <>
          <DeleteModal
            modal={deleteModal}
            close={closeDeleteModal}
            deleteSpaceId={service.id}
          />
        </>
      )}

      <Header justify="center" navigateBackTo="/spaces" />
      <Page type="form">
        {service ? (
          <DetailsService service={service} openDeleteModal={openDeleteModal}>
            <DetailsCard owner={service.owner} />
          </DetailsService>
        ) : (
          <ServiceLoading />
        )}
      </Page>
      <Footer />
    </>
  );
}
