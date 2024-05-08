import { FiTrash } from "react-icons/fi";
import styles from "./styles.module.css";
import { useSession } from "next-auth/react";

interface Props {
  openDeleteModal: () => void;
  ownerId: number;
}

export function DeleteButton(props: Props) {
  const { openDeleteModal, ownerId } = props;

  const { data } = useSession();

  const isOwner = data?.user && parseInt(data?.user?.id) === ownerId;

  if (!isOwner) return null;

  return (
    <FiTrash size={20} className={styles.button} onClick={openDeleteModal} />
  );
}
