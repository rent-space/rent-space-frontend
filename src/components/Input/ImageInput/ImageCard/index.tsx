import Image from "next/image";
import styles from "./styles.module.css";
import { Text } from "@/components/Text";
import { IoIosClose } from "react-icons/io";

interface Props {
  image: File;
  key: string;
  onRemove: (imageName: string) => void;
}

export function ImageCard(props: Props) {
  const { image, onRemove } = props;

  return (
    <div className={styles.card}>
      <IoIosClose
        size={25}
        className={styles.closeIcon}
        onClick={() => onRemove(image.name)}
      />
      <div className={styles.imageContainer}>
        <Image
          src={URL.createObjectURL(image)}
          alt={image.name}
          fill
          objectFit="contain"
        />
      </div>
      <div className={styles.imageTitle}>
        <Text tone="secondary" variant="label">
          {image.name}
        </Text>
      </div>
    </div>
  );
}
