import { FaUsers } from "react-icons/fa";
import { Input } from "../Input";
import Modal from "../Modal";
import { Text } from "../Text";
import styles from "./styles.module.css";
import { useState } from "react";
import { DateTime } from "next-auth/providers/kakao";
import { Button } from "../Button";

interface Props {
  open: boolean;
  close: () => void;
}

export default function ReserveModal(props: Props) {
  const { close, open } = props;

  const [startsAt, setStartsAt] = useState<DateTime>();
  const [endsAt, setEndsAt] = useState<DateTime>();
  const [numOfParticipants, setNumOfParticipants] = useState<number>();
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const [numOfInstallments, setNumOfInstallments] = useState<number>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const reservation = {
      startsAt,
      endsAt,
      numOfParticipants,
      paymentMethod,
      numOfInstallments,
    };

    console.log(reservation);
  };

  return (
    <Modal open={open} onClose={close}>
      <Text size="title1" weight="semibold">
        Reservando
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
            Solicitar Reserva
          </Button>
        </div>
      </form>
    </Modal>
  );
}
