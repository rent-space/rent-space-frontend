import { FiXCircle } from "react-icons/fi";

import styles from "./styles.module.css";
import { HTMLAttributes } from "react";

type ModalProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onClose: () => void;
};

export default function Modal({ onClose, open, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <FiXCircle
          color="#000"
          size={24}
          onClick={onClose}
          className={styles.closeModal}
        />
        {children}
      </div>
    </div>
  );
}
