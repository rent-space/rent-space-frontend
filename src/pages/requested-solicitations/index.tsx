import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { UserAvatar } from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import styles from './styles.module.css';
import { getPlaceReservationById } from "@/services/api/reservations";
import { PlaceReservation } from "@/utils/types";
import PageCard from "./_card";

interface PageDataProps {
  title: string,
  firstSection: string,
  secSection: string
}

export default function RequestedSolicitations() {
  const { data } = useSession();
  const [placeReservation, setPlaceReservation] = useState<PlaceReservation[] | null>(null);
  const [pageData, setPageData] = useState<PageDataProps>({
    title: "Suas reservas",
    firstSection: "Solicitações pendentes",
    secSection: "Solicitações respondidas"
  });

  useEffect(() => {
    const getReservation = async () => {
      const reservationConfirmed = await getPlaceReservationById(1);
      const reservation = await getPlaceReservationById(2);
      setPlaceReservation([reservationConfirmed, reservation]);
    }

    getReservation();
  }, [])

  useEffect(() => {
    if (data?.user?.userType === 'SPACE_OWNER' || data?.user?.userType === 'SERVICE_OFFER') {
      const pageInfos = {
        title: "Solicitações recebidas",
        firstSection: "Reservas requisitadas",
        secSection: "Reservas respondidas"
      }

      setPageData({
        ...pageData,
        ...pageInfos
      })
    }

  }, [data])

  return (
    <>
      <Header>
        <NavBar />
        <UserAvatar />
      </Header>

      <section className={styles.container}>
        <h1 className={styles.pageTitle}>{pageData.title}</h1>

        <div className={styles.cardsContainer}>
          <span className={styles.sectionTitle}>{pageData.firstSection}</span>

          <div className={styles.cards}>
            {placeReservation !== null && placeReservation[1] &&
            <PageCard placeReservation={placeReservation[1]}/>}
          </div>
        </div>

        <div className={styles.cardsContainer}>
          <span className={styles.sectionTitle}>{pageData.secSection}</span>

          <div className={styles.cards}>
            {placeReservation !== null && placeReservation[0] &&
            <PageCard placeReservation={placeReservation[0]} shouldClick={false} />}
          </div>
        </div>
      </section>
    </>
  )
}