import { FiTrash } from "react-icons/fi";
import { Button } from "../Button";
import styles from "./styles.module.css";
import { FaRegTimesCircle } from "react-icons/fa";
import {deleteSpace} from '../../../src/services/api/space'
import { useRouter } from "next/router";
interface Props {
  modal: boolean;
  close: () => void;
  deleteSpaceId: number;
}


export default function DeleteModal(props: Props) {
  const { close, modal, deleteSpaceId } = props;
  const router = useRouter();

 const handleDeleteSpace = (id:number) => {
     deleteSpace(id);
    router.push("/spaces");
  }

  if (!modal) return null;

  return (
    <>
    <div className={styles.background}>
      <div className={styles.modal}>
        <FaRegTimesCircle className={styles.close} size={24} onClick={close} style={{color:'#bdbdbd'}}/>
        <div className={styles.textContainer}>
          <span className={styles.title}>
            Deseja excluir o espaço?
          </span>
          <p className={styles.subtitle}>
            Tem certeza que deseja excluir o espaço? Essa ação é irrevesível.
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <Button size="small" variant="secondary" onClick={close} > Cancelar </Button>
          <Button size="small" variant="primary" className={styles.removeButton} onClick={() => {handleDeleteSpace(deleteSpaceId)}}>
            Excluir espaço
            <FiTrash style={{paddingLeft:'0.7rem'}}/>
          </Button>

        </div>
      </div>
    </div>
    </>
  );
}
