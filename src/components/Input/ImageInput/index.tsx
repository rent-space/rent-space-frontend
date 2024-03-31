import { useRef } from "react";
import styles from "./styles.module.css";
import { FiUpload } from "react-icons/fi";

interface Props {
  name: string;
}

export function ImageInput(props: Props) {
  const { name } = props;

  const imageInputRef = useRef<HTMLInputElement>(null);

  const openInput = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className={styles.imageInputContainer} onClick={openInput}>
      <FiUpload size={30} className={styles.icon} />
      <label htmlFor={name}>Clique ou arraste para adicionar sua imagem</label>
      <input
        id={name}
        className={styles.imageInput}
        type="file"
        accept="image/png, image/jpeg"
        ref={imageInputRef}
      />
    </div>
  );
}
