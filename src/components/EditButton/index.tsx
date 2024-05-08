import { FaPencil } from "react-icons/fa6";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface Props {
  id: number;
  ownerId: number;
}

export function EditButton(props: Props) {
  const { id, ownerId } = props;

  const router = useRouter();

  const { data } = useSession();

  const isOwner = data?.user && parseInt(data?.user?.id) === ownerId;

  if (!isOwner) return null;

  const edit = () => {
    router.push(`/space/edit/${id}`);
  };

  return <FaPencil size={20} className={styles.button} onClick={edit} />;
}
