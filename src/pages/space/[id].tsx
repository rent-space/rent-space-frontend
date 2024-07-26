import { Header } from "@/components/Header";
import { Page } from "@/components/Page";
import { DetailsSpace } from "@/components/DetailsSpace";
import { DetailsCard } from "@/components/DetailsCard";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Space } from "@/utils/types";
import { deleteSpace, getSpace } from "@/services/api/space";
import ReserveModal from "@/components/ReserveModal";
import DeleteModal from "@/components/DeleteModal";

import { SpaceLoading } from "@/components/SpaceLoading";
import { createPlaceReservation } from "@/services/api";

export default function DetailsPageSpace() {
  const router = useRouter();

  const [id, setId] = useState<number>();
  const [space, setSpace] = useState<Space | undefined>(undefined);
  const [reserveModal, setReserveModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => setDeleteModal(true);
  const openReserveModal = () => setReserveModal(true);

  const closeReserveModal = () => setReserveModal(false);
  const closeDeleteModal = () => setDeleteModal(false);

  useEffect(() => {
    setId(parseInt(router.query.id as string));
  }, [router.query.id]);

  useEffect(() => {
    id && getSpace(id).then((response) => response && setSpace(response));
  }, [id]);

  return (
    <>
      {space && (
        <>
          <ReserveModal
            product={space}
            open={reserveModal}
            close={closeReserveModal}
            createReservation={createPlaceReservation}
          />
          <DeleteModal
            modal={deleteModal}
            close={closeDeleteModal}
            id={space.id}
            deleteQuery={deleteSpace}
            type="espaço"
          />
        </>
      )}

      <Header justify="center" navigateBackTo="/spaces" />
      <Page type="form">
        {space ? (
          <DetailsSpace
            space={space}
            openModal={openReserveModal}
            openDeleteModal={openDeleteModal}
          >
            <DetailsCard owner={space.owner} />
          </DetailsSpace>
        ) : (
          <SpaceLoading />
        )}
      </Page>
      <Footer />
    </>
  );
}
