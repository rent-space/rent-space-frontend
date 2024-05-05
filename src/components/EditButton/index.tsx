import { FaPencil } from "react-icons/fa6";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

interface Props {
  id: number;
}

export function EditButton(props: Props) {
  const { id } = props;

  const router = useRouter();

  const edit = () => {
    router.push(`/space/edit/${id}`);
  };

  return <FaPencil size={20} className={styles.button} onClick={edit} />;
}
