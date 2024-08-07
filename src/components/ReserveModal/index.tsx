import { Input } from "../Input";
import Modal from "../Modal";
import { Text } from "../Text";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { DateTime } from "next-auth/providers/kakao";
import { Button } from "../Button";
import { PaymentMethods, PlaceReservation, PlaceReservationBody, Space } from "@/utils/types";
import { useSession } from "next-auth/react";
import { createPlaceReservation } from "@/services/api/reservations";
import { useRouter } from "next/router";
import PaymentForm from "../PaymentModal";
import { toast } from "react-toastify";

interface Props {
  space: Space;
  open: boolean;
  close: () => void;
}

export default function ReserveModal(props: Props) {
  const { close, open, space } = props;

  const { data } = useSession();
  const router = useRouter();

  const [userId, setUserId] = useState<number>();
  const [startsAt, setStartsAt] = useState<DateTime>(new Date().toISOString());
  const [endsAt, setEndsAt] = useState<DateTime>(new Date().toISOString());
  const [numOfParticipants, setNumOfParticipants] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>("PIX");
  const [numOfInstallments, setNumOfInstallments] = useState<number>(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [reservationResponse, setReservationResponse] = useState<PlaceReservation>();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    data?.user.id && setUserId(parseInt(data?.user.id));
  }, [data?.user.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) throw new Error("ERROR_FETCHING_USER_ID");

    const reservation: PlaceReservationBody = {
      startsAt,
      endsAt,
      numOfParticipants,
      paymentMethod,
      numOfInstallments,
      productId: space.id,
      eventOwnerId: userId,
      hiredRelatedServicesIds: [],
    };

    setLoading(true);
    createPlaceReservation(reservation)
      .then((res) => {
        setLoading(false);
        setPaymentModalOpen(true);
        setReservationResponse(res);
        // res && router.push("/requested-solicitations");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const paymentSucceded = () => {
    toast.success("Pagamento realizado com sucesso!");
    router.push("/requested-solicitations");
  }

  const getFinalPrice = () => {
    if (reservationResponse?.placeFinalPrice) {
      return Math.round(reservationResponse?.placeFinalPrice * 100)
    } else if (reservationResponse?.servicesFinalPrice) {
      return Math.round(reservationResponse?.servicesFinalPrice * 100)
    } else {
      return "";
    }
  }

  return (
    <Modal open={open} onClose={close}>
      {!paymentModalOpen ?
        <>
          <Text size="title1" weight="semibold">
            Solicitação de Reserva
          </Text>
          <Text size="subtitle" color="gray">
            {space.title}
          </Text>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inline}>
              <Input
                value={startsAt}
                name="startsAt"
                label="O evento inicia às"
                type="datetime-local"
                setValue={setStartsAt}
                required
              />
              <Input
                value={endsAt}
                name="endsAt"
                label="O evento termina às"
                type="datetime-local"
                setValue={setEndsAt}
                required
              />
            </div>
            <Input
              value={numOfParticipants}
              name="numOfParticipants"
              label="Quantidade de participantes"
              type="number"
              setValue={setNumOfParticipants}
              min={0}
              required
            />
            <div className={styles.inline}>
              <Input
                value={paymentMethod}
                name="paymentMethod"
                label="Método de pagamento"
                type="select"
                options={[
                  { value: "PIX", label: "PIX" },
                  { value: "CREDIT", label: "Crédito" },
                ]}
                setValue={setPaymentMethod}
                required
              />
              {paymentMethod === "CREDIT" && (
                <Input
                  value={numOfInstallments}
                  name="numOfInstallments"
                  label="Quantidade de parcelas"
                  type="number"
                  setValue={setNumOfInstallments}
                  min={0}
                  max={10}
                />
              )}
            </div>
            <div>
              <Button
                type="submit"
                size="small"
                variant="primary"
                className={styles.reserve}
              >
                {loading ? "Solicitando..." : "Solicitar Reserva"}
              </Button>
            </div>
          </form>
        </>
        :
        <PaymentForm 
          amount={getFinalPrice().toString()}
          connectedAccountId={reservationResponse?.product.owner.accountId ?? ""}
          onPaymentSuccess={paymentSucceded}
        />
      }
    </Modal>
  );
}
