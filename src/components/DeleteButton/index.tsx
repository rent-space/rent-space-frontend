import { FiTrash } from "react-icons/fi";
import styles from "./styles.module.css";
import { useSession } from "next-auth/react";

interface Props {
  openDeleteModal: () => void;
}

export function DeleteButton(props: Props) {
  const { openDeleteModal } = props;

  const { data } = useSession();

  const isPlaceOwner = data?.user && data?.user?.userType === "PLACE_OWNER";

  if (!isPlaceOwner) return null;

  return (
    <FiTrash size={20} className={styles.button} onClick={openDeleteModal} />
  );
}
