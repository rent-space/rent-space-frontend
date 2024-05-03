import { FaUsers } from "react-icons/fa";
import { Input } from "../Input";
import Modal from "../Modal";
import { Text } from "../Text";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { DateTime } from "next-auth/providers/kakao";
import { Button } from "../Button";
import {
  PaymentMethods,
  PlaceReservationBody,
  Space,
  SpaceReservationBody,
} from "@/utils/types";
import { useSession } from "next-auth/react";
import { createPlaceReservation } from "@/services/api/reservations";
import { useRouter } from "next/router";

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
        res && router.push("/requested-solicitations");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <Modal open={open} onClose={close}>
      <Text size="title1" weight="semibold">
        Reservando {space.title}
      </Text>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="startsAt"
          label="O evento inicia às"
          type="datetime-local"
          setValue={setStartsAt}
          required
        />
        <Input
          name="endsAt"
          label="O evento termina às"
          type="datetime-local"
          setValue={setEndsAt}
          required
        />
        <Input
          name="numOfParticipants"
          label="Quantidade de participantes"
          type="number"
          setValue={setNumOfParticipants}
          min={0}
          required
        />
        <Input
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
        <Input
          name="numOfInstallments"
          label="Quantidade de parcelas"
          type="number"
          setValue={setNumOfInstallments}
          min={0}
          max={10}
        />
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
    </Modal>
  );
}
