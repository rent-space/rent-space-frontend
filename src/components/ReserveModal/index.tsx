import styles from "./styles.module.css";
import { FaRegTimesCircle } from "react-icons/fa";

interface Props {
  modal: boolean;
  close: () => void;
}

export default function ReserveModal(props: Props) {
  const { close, modal } = props;

  if (!modal) return null;

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <FaRegTimesCircle className={styles.close} size={24} onClick={close} />
      </div>
    </div>
  );
}
