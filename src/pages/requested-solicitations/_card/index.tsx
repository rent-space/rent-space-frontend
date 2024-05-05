import { PlaceReservation } from "@/utils/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment-timezone";
import { Card } from "@/components/AuthCard";
import { FiCameraOff, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import StatusTag from "@/components/StatusTag";
import { UserAccountCircle } from "@/components/Icons/UserAccountCircle";

import styles from "./styles.module.css";
import Modal from "@/components/Modal";
import { updatePlaceReservation } from "@/services/api/reservations";

interface PageCardProps {
  placeReservation: PlaceReservation;
  shouldClick?: boolean;
}

export default function PageCard({
  placeReservation,
  shouldClick = true,
}: PageCardProps) {
  const [placeImage, setPlaceImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (placeReservation?.product?.media?.length > 0) {
      setPlaceImage(
        placeReservation?.product?.media[0].includes("/") ?
        placeReservation?.product?.media[0] : 
        null
      );
    }
  }, []);

  const getStatusText = (status: string) => {
    if (status == "PENDING") return "PENDENTE";
    else if (status == "ACCEPTED") return "CONFIRMADA";
    else return "CANCELADA";
  };

  const getFormattedDate = (date: string) => {
    return moment
      .tz(date, "YYYY-MM-DDT00:00:00.000Z", "America/Sao_Paulo")
      .format("DD/MM/YYYY 00:00")
      .toString();
  };

  const updateReservationStatus = (accepted: boolean) => {
    updatePlaceReservation(
      placeReservation.id,
      accepted ? "ACCEPTED" : "REJECTED"
    ).then((response) => {
      placeReservation = response;
      setIsModalOpen(false);
    });
  };

  const openModal = () => {
    if (shouldClick) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Card
        hasMargin={false}
        aditionalStyles={`${styles.cardStyle} ${
          !shouldClick && styles.noClick
        }`}
        onClick={openModal}
      >
        {placeImage !== null ? (
          <Image src={placeImage} alt="Imagem do local" layout="fill" />
        ) : (
          <div className={styles.noImagePlace}>
            <FiCameraOff color="#FFF" size={32} />
          </div>
        )}

        {placeReservation && (
          <>
            <section className={styles.cardInfoCont}>
              <strong className={styles.cardTitle}>
                {placeReservation?.product?.title}
              </strong>
              <strong className={styles.cardInfo}>
                Início:{" "}
                <span className={styles.cardInfoValue}>
                  {getFormattedDate(placeReservation.startsAt)}
                </span>
              </strong>
              <strong className={styles.cardInfo}>
                Fim:{" "}
                <span className={styles.cardInfoValue}>
                  {getFormattedDate(placeReservation.endsAt)}
                </span>
              </strong>
              <strong className={styles.cardInfo}>
                Qnt. pessoas:{" "}
                <span className={styles.cardInfoValue}>
                  {placeReservation.numOfParticipants}
                </span>
              </strong>
              <strong className={styles.cardInfo}>
                Valor:{" "}
                <span className={styles.cardInfoValue}>
                  R$ {placeReservation.placeFinalPrice}
                </span>
              </strong>

              <StatusTag
                status={placeReservation.status.toLowerCase() as any}
                tagText={getStatusText(placeReservation.status)}
              />
            </section>

            <div className={styles.separator}></div>

            <section
              className={`${styles.cardInfoCont} ${styles.userInfoCont}`}
            >
              <strong className={styles.userInfoTitle}>Solicitado por:</strong>

              <UserAccountCircle
                image={
                  placeReservation.eventOwner.profilePhoto == "string"
                    ? null
                    : placeReservation.eventOwner.profilePhoto || null
                }
              />
              <strong className={styles.userName}>
                {placeReservation.eventOwner.name}
              </strong>
              <span className={styles.userInfo}>
                {placeReservation.eventOwner.email}
              </span>
              <span className={styles.userInfo}>
                {placeReservation.eventOwner.telephone}
              </span>
            </section>
          </>
        )}
      </Card>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h3 className={styles.modalTitle}>
            Deseja aceitar essa solicitação?
          </h3>
          <section className={styles.buttonsContainer}>
            <button
              className={styles.button}
              onClick={() => updateReservationStatus(true)}
            >
              <FiThumbsUp color="#FFF" size={24} />
              <span className={styles.buttonText}>Aceitar</span>
            </button>
            <button
              className={`${styles.button} ${styles.secButton}`}
              onClick={() => updateReservationStatus(false)}
            >
              <FiThumbsDown color="#eb5b14" size={24} />
              <span className={styles.secButtonText}>Recusar</span>
            </button>
          </section>
        </Modal>
      )}
    </>
  );
}
