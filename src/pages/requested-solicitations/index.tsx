import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { UserAvatar } from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

import styles from "./styles.module.css";
import {
  getPlaceReservations,
  getServiceReservations,
} from "@/services/api/reservations";
import { PlaceReservation, ServiceReservation } from "@/utils/types";
import PageCard from "./_card";
import Loading from "@/components/Loading";
import { useTranslations } from "next-intl";

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
    PlaceReservation[] | ServiceReservation[] | null | undefined
  >(null);
  const [pendingReservation, setPendingReservation] = useState<
    PlaceReservation[] | ServiceReservation[] | null | undefined
  >(null);
  const [answeredReservation, setAnsweredReservation] = useState<
    PlaceReservation[] | ServiceReservation[] | null | undefined
  >(null);
  const [pageData, setPageData] = useState<PageDataProps>({
    title: "Suas reservas",
    firstSection: "Solicitações pendentes",
    secSection: "Solicitações respondidas",
  });

  const t = useTranslations();

  useEffect(() => {
    const userType = data?.user.userType;

    const getReservation = async () => {
      Promise.all([
        getPlaceReservations(userType),
        getServiceReservations(userType),
      ]).then((reservations) => {
        setAllReservations(reservations.flat());
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

  const getReservationsForUser = useCallback(
    (userEmail: string) => {
      if (allReservations != null) {
        const pendingList: any = [];
        const answeredList: any = [];

        allReservations.forEach((reserv) => {
          if (
            reserv?.status == "PENDING" &&
            (reserv?.product.owner.email == userEmail ||
              reserv?.eventOwner.email == userEmail)
          ) {
            pendingList.push(reserv);
          } else if (
            reserv?.product.owner.email == userEmail ||
            reserv?.eventOwner.email == userEmail
          ) {
            answeredList.push(reserv);
          }
        });

        setIsLoading(false);
        setPendingReservation(pendingList);
        setAnsweredReservation(answeredList);
      }
    },
    [allReservations]
  );

  useEffect(() => {
    if (data?.user.email && isLoading) {
      getReservationsForUser(data?.user.email);
    }
  }, [data?.user.email, getReservationsForUser, isLoading]);

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
              <Loading loadingLabel={t("loading-reserve")} />
            ) : pendingReservation !== null &&
              (pendingReservation ?? []).length > 0 ? (
              pendingReservation?.map((reser, index) =>
                data?.user?.userType != "SERVICE_OWNER" ? (
                  <PageCard
                    type="PLACE"
                    reservation={reser}
                    key={index}
                    shouldClick={
                      reser.status === "PENDING" &&
                      data?.user.userType === "PLACE_OWNER"
                    }
                  />
                ) : (
                  <PageCard
                    type="SERVICE"
                    reservation={reser}
                    key={index}
                    shouldClick={
                      reser.status === "PENDING" &&
                      data?.user.userType === "SERVICE_OWNER"
                    }
                  />
                )
              )
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
              (answeredReservation ?? []).length > 0 ? (
              answeredReservation?.map((reser, index) =>
                data?.user?.userType != "SERVICE_OWNER" ? (
                  <PageCard
                    type="PLACE"
                    reservation={reser}
                    key={index}
                    shouldClick={reser.status === "PENDING"}
                  />
                ) : (
                  <PageCard
                    type="SERVICE"
                    reservation={reser}
                    key={index}
                    shouldClick={reser.status === "PENDING"}
                  />
                )
              )
            ) : (
              <span>Não há nenhuma solicitação</span>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
