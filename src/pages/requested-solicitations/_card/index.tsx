import { PlaceReservation, ServiceReservation } from "@/utils/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment-timezone";
import { Card } from "@/components/AuthCard";
import { FiCameraOff, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import StatusTag from "@/components/StatusTag";
import { UserAccountCircle } from "@/components/Icons/UserAccountCircle";

import styles from "./styles.module.css";
import Modal from "@/components/Modal";
import {
  updatePlaceReservation,
  updateServiceReservation,
} from "@/services/api/reservations";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";

interface PageCardProps {
  reservation: PlaceReservation | ServiceReservation;
  shouldClick?: boolean;
  type: "PLACE" | "SERVICE";
}

export default function PageCard({
  reservation,
  shouldClick = true,
}: PageCardProps) {
  const router = useRouter();

  const [placeImage, setPlaceImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (reservation?.product?.media?.length > 0) {
      setPlaceImage(
        reservation?.product?.media[0].includes("base64")
          ? reservation?.product?.media[0]
          : null
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
      .tz(date, "YYYY-MM-DDTH:mm:ss.000Z", "America/Sao_Paulo")
      .format("DD/MM/YYYY HH:mm")
      .toString();
  };

  const updateReservationStatus = async (accepted: boolean) => {
    setLoading(true);
    try {
      const status = accepted ? "ACCEPTED" : "REFUSED";

      // TODO: ADICIONAR UPDATE SERVICE RESERVATION

      let response = await updatePlaceReservation(reservation.id, status);

      reservation = response;
      setIsModalOpen(false);
      router.reload();
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
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
        {placeImage !== null &&
        placeImage?.length &&
        placeImage.includes("base64") ? (
          <Image
            className={styles.image}
            src={placeImage}
            alt="Imagem do local"
            layout="fill"
          />
        ) : (
          <div className={styles.noImagePlace}>
            <FiCameraOff color="#FFF" size={32} />
          </div>
        )}

        {reservation && (
          <>
            <section className={styles.cardInfoCont}>
              <strong className={styles.cardTitle}>
                {reservation?.product?.title}
              </strong>
              <strong className={styles.cardInfo}>
                Início:{" "}
                <span className={styles.cardInfoValue}>
                  {getFormattedDate(reservation.startsAt)}
                </span>
              </strong>
              <strong className={styles.cardInfo}>
                Fim:{" "}
                <span className={styles.cardInfoValue}>
                  {getFormattedDate(reservation.endsAt)}
                </span>
              </strong>
              <strong className={styles.cardInfo}>
                Qnt. pessoas:{" "}
                <span className={styles.cardInfoValue}>
                  {reservation.numOfParticipants}
                </span>
              </strong>
              <strong className={styles.cardInfo}>
                Valor:{" "}
                <span className={styles.cardInfoValue}>
                  R$ {reservation.placeFinalPrice}
                </span>
              </strong>

              <StatusTag
                status={reservation.status.toLowerCase() as any}
                tagText={getStatusText(reservation.status)}
              />
            </section>

            <div className={styles.separator}></div>

            <section
              className={`${styles.cardInfoCont} ${styles.userInfoCont}`}
            >
              <strong className={styles.userInfoTitle}>Solicitado por:</strong>

              <UserAccountCircle
                image={reservation.eventOwner.profilePhoto || null}
              />
              <strong className={styles.userName}>
                {reservation.eventOwner.name}
              </strong>
              <span className={styles.userInfo}>
                {reservation.eventOwner.email}
              </span>
              <span className={styles.userInfo}>
                {reservation.eventOwner.telephone}
              </span>
            </section>
          </>
        )}
      </Card>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className={styles.modalTitle}>Deseja aceitar essa solicitação?</h3>
        <section className={styles.buttonsContainer}>
          <button
            className={styles.button}
            onClick={() => updateReservationStatus(true)}
            disabled={loading}
          >
            {loading ? (
              <Loading loadingLabel="" color="white" />
            ) : (
              <>
                <FiThumbsUp color="#FFF" size={24} />
                <span className={styles.buttonText}>Aceitar</span>
              </>
            )}
          </button>
          <button
            className={`${styles.button} ${styles.secButton}`}
            onClick={() => updateReservationStatus(false)}
            disabled={loading}
          >
            {loading ? (
              <Loading loadingLabel="" />
            ) : (
              <>
                <FiThumbsDown color="#eb5b14" size={24} />
                <span className={styles.secButtonText}>Recusar</span>
              </>
            )}
          </button>
        </section>
      </Modal>
    </>
  );
}
