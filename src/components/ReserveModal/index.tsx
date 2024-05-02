import { Input } from "../Input";
import Modal from "../Modal";
import { Text } from "../Text";
import styles from "./styles.module.css";

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
      <Input name="startDate" label="Selecione a data de início" type="date" />
    </Modal>
  );
}
