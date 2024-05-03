import { Header } from "@/components/Header";
import { Page } from "@/components/Page";
import { DetailsSpace } from "@/components/DetailsSpace";
import { DetailsCard } from "@/components/DetailsCard";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Space } from "@/utils/types";
import { getSpace } from "@/services/api/space";
import ReserveModal from "@/components/ReserveModal";
import DeleteModal from "@/components/DeleteModal";

export default function DetailsPageSpace() {
  const [space, setSpace] = useState<Space | undefined>(undefined);
  const [reserveModal, setReserveModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => setDeleteModal(true);
  const openReserveModal = () => setReserveModal(true);

  const closeReserveModal = () => setReserveModal(false);
  const closeDeleteModal = () => setDeleteModal(false);

  const router = useRouter();

  useEffect(() => {
    const id = parseInt(router.query.id as string);
    getSpace(id).then((response) => response && setSpace(response));
  }, [router.query.id]);

  return (
    <>
      <ReserveModal modal={reserveModal} close={closeReserveModal}/>
      
      { space?.id &&
        <DeleteModal modal={deleteModal} close={closeDeleteModal}  deleteSpaceId={space.id}/>
      }
      <Header justify="center" navigateBackTo="/spaces" />
      <Page type="form">
        {space && (
          <DetailsSpace space={space} openModal={openReserveModal} openDeleteModal={openDeleteModal}>
            <DetailsCard owner={space.owner} />
          </DetailsSpace>
        )}
      </Page>
      <Footer />
    </>
  );
}
