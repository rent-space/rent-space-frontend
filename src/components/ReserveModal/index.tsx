import styles from "./styles.module.css";
import { FaRegTimesCircle } from "react-icons/fa";

interface Props {
  close: () => void;
}

export default function ReserveModal(props: Props) {
  const { close } = props;

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <FaRegTimesCircle className={styles.close} size={24} onClick={close} />
      </div>
    </div>
  );
}
