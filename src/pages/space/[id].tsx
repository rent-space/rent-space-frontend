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
import Image from "next/image";
import Loading from "@/components/Loading";

import searchGif from "@/assets/searching.gif";

export default function DetailsPageSpace() {
  const router = useRouter();

  const [id, setId] = useState<number>();
  const [space, setSpace] = useState<Space | undefined>(undefined);
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  useEffect(() => {
    setId(parseInt(router.query.id as string));
  }, [router.query.id]);

  useEffect(() => {
    id && getSpace(id).then((response) => response && setSpace(response));
  }, [id]);

  return (
    <>
      {space && <ReserveModal space={space} open={modal} close={closeModal} />}
      <Header justify="center" navigateBackTo="/spaces" />
      <Page type="form">
        {space ? (
          <DetailsSpace space={space} openModal={openModal}>        
           <DetailsCard owner={space.owner} />
          </DetailsSpace> )
          :
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Image 
              src={searchGif}
              width={200}
              alt="Searching"
            />
            <Loading loadingLabel="Estamos carregando as informações desse spaço" />
          </div>
        }
      </Page>
      <Footer />
    </>
  );
}
