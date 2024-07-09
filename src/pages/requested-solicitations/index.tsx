import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { UserAvatar } from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import styles from "./styles.module.css";
import { getPlaceReservations } from "@/services/api/reservations";
import { PlaceReservation } from "@/utils/types";
import PageCard from "./_card";
import Loading from "@/components/Loading";

interface PageDataProps {
  title: string;
  firstSection: string;
  secSection: string;
}

export default function RequestedSolicitations() {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldRespond, setShouldRespond] = useState<boolean>(false);
  const [allReservations, setAllReservations] = useState<
    PlaceReservation[] | null
  >(null);
  const [pedingReservation, setPendingReservation] = useState<
    PlaceReservation[] | null
  >(null);
  const [answeredReservation, setAnsweredReservation] = useState<
    PlaceReservation[] | null
  >(null);
  const [pageData, setPageData] = useState<PageDataProps>({
    title: "Suas reservas",
    firstSection: "Solicitações pendentes",
    secSection: "Solicitações respondidas",
  });

  useEffect(() => {
    const getReservation = async () => {
      getPlaceReservations().then((reservations) => {
        setAllReservations(reservations);
      });
    };

    getReservation();
  }, []);

  useEffect(() => {
    if (
      data?.user?.userType === "PLACE_OWNER" ||
      data?.user?.userType === "SERVICE_OWNER"
    ) {
      const pageInfos = {
        title: "Solicitações recebidas",
        firstSection: "Reservas requisitadas",
        secSection: "Reservas respondidas",
      };
      setShouldRespond(true);

      setPageData({
        ...pageData,
        ...pageInfos,
      });
    }
  }, [data?.user]);

  useEffect(() => {
    if (data?.user.email && isLoading) {
      getReservationsForUser(data?.user.email);
    }
  }, [data?.user, allReservations]);

  const getReservationsForUser = (userEmail: string) => {
    if (allReservations != null) {
      let pendingList: PlaceReservation[] = [];
      let answeredList: PlaceReservation[] = [];
      console.log(allReservations);

      allReservations.forEach((reserv) => {
        if (
          reserv.status == "PENDING" &&
          (reserv.product.owner.email == userEmail ||
            reserv.eventOwner.email == userEmail)
        ) {
          pendingList.push(reserv);
        } else if (
          reserv.product.owner.email == userEmail ||
          reserv.eventOwner.email == userEmail
        ) {
          answeredList.push(reserv);
        }
      });

      setIsLoading(false);
      setPendingReservation(pendingList);
      setAnsweredReservation(answeredList);
    }
  };

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
            {isLoading ? (
              <Loading loadingLabel="Carregando suas reservas..." />
            ) : pedingReservation !== null && pedingReservation.length > 0 ? (
              pedingReservation.map((reser, index) => (
                <PageCard
                  placeReservation={reser}
                  key={index}
                  shouldClick={shouldRespond}
                />
              ))
            ) : (
              <span>Não há nenhuma solicitação</span>
            )}
          </div>
        </div>

        <div className={styles.cardsContainer}>
          <span className={styles.sectionTitle}>{pageData.secSection}</span>

          <div className={styles.cards}>
            {isLoading ? (
              <Loading loadingLabel="Carregando suas reservas..." />
            ) : answeredReservation !== null &&
              answeredReservation.length > 0 ? (
              answeredReservation.map((reser, index) => (
                <PageCard
                  placeReservation={reser}
                  key={index}
                  shouldClick={false}
                />
              ))
            ) : (
              <span>Não há nenhuma solicitação</span>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
