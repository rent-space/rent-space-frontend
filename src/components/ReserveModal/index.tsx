import { FaUsers } from "react-icons/fa";
import { Input } from "../Input";
import Modal from "../Modal";
import { Text } from "../Text";
import styles from "./styles.module.css";
import { CiCalendar } from "react-icons/ci";
import { useRef } from "react";

interface Props {
  open: boolean;
  close: () => void;
}

export default function ReserveModal(props: Props) {
  const { close, open } = props;

  return (
    <Modal open={open} onClose={close}>
      <Text size="title1" weight="semibold">
        Reservando
      </Text>
      <Input name="startsAt" label="O evento inicia às" type="datetime-local" />
      <Input name="endsAt" label="O evento termina às" type="datetime-local" />
      <Input
        name="numOfParticipants"
        label="Número de participantes"
        type="number"
        icon={FaUsers}
      />
      <Input
        name="paymentMethod"
        label="Método de pagamento"
        type="select"
        options={[
          { value: "PIX", label: "PIX" },
          { value: "CREDIT", label: "Crédito" },
        ]}
      />
      <Input
        name="numOfInstallments"
        label="Quantidade de parcelas"
        type="number"
        min={0}
        max={10}
      />
    </Modal>
  );
}
