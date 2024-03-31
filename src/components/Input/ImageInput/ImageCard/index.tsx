import Image from "next/image";
import styles from "./styles.module.css";

interface Props {
  image: File;
  key: string;
}

export function ImageCard(props: Props) {
  const { image, key } = props;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          key={key}
          src={URL.createObjectURL(image)}
          alt={image.name}
          fill
          objectFit="contain"
        />
      </div>
    </div>
  );
}
