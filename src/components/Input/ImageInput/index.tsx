import { ChangeEvent, useRef, useState } from "react";
import styles from "./styles.module.css";
import { FiUpload } from "react-icons/fi";
import { ImageCard } from "./ImageCard";

interface Props {
  name: string;
}

export function ImageInput(props: Props) {
  const { name } = props;

  const [images, setImages] = useState<File[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImages([...images, file]);
    }
  };

  return (
    <>
      <button
        className={styles.imageButton}
        type="button"
        onClick={handleClick}
      >
        <FiUpload size={30} className={styles.icon} />
        Clique ou arraste para adicionar sua imagem
      </button>
      <input
        id={name}
        className={styles.imageInput}
        type="file"
        accept="image/png, image/jpeg"
        ref={imageInputRef}
        onChange={handleChange}
      />
      <div className={styles.images}>
        {images.map((image) => (
          <ImageCard key={image.name} image={image} />
        ))}
      </div>
    </>
  );
}
