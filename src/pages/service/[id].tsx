import { Header } from "@/components/Header";
import { Page } from "@/components/Page";
import { DetailsCard } from "@/components/DetailsCard";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Service } from "@/utils/types";
import DeleteModal from "@/components/DeleteModal";

import { ServiceLoading } from "@/components/ServiceLoading";
import {
  createServiceReservation,
  deleteService,
  getService,
} from "@/services/api";
import { DetailsService } from "@/components/DetailsService";
import ReserveModal from "@/components/ReserveModal";
import { resolve } from "path";

export default function ServiceDetails() {
  const router = useRouter();

  const [id, setId] = useState<number>();
  const [service, setService] = useState<Service | undefined>(undefined);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reserveModal, setReserveModal] = useState(false);

  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const openReserveModal = () => setReserveModal(true);
  const closeReserveModal = () => setReserveModal(false);

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
          <ReserveModal
            product={service}
            open={reserveModal}
            close={closeReserveModal}
            createReservation={createServiceReservation}
          />
          <DeleteModal
            modal={deleteModal}
            close={closeDeleteModal}
            deleteQuery={deleteService}
            type="serviço"
            id={service.id}
          />
        </>
      )}

      <Header justify="center" navigateBackTo="/services" />
      <Page type="form">
        {service ? (
          <DetailsService
            service={service}
            openDeleteModal={openDeleteModal}
            openReserveModal={openReserveModal}
          >
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
