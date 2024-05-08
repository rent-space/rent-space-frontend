import Image from "next/image";
import styles from "./styles.module.css";
import { Text } from "@/components/Text";
import { IoIosClose } from "react-icons/io";
import { useMemo } from "react";

interface Props {
  image: File;
  key: string;
  onRemove: (imageName: string) => void;
}

export function ImageCard(props: Props) {
  const { image, onRemove } = props;

  const imageSrc = useMemo(() => URL.createObjectURL(image), [image]);

  return (
    <div className={styles.card}>
      <IoIosClose
        size={25}
        className={styles.closeIcon}
        onClick={() => onRemove(image.name)}
      />
      <div className={styles.imageContainer}>
        <Image src={imageSrc} alt={image.name} fill objectFit="contain" />
      </div>
      <div className={styles.imageTitle}>
        <Text color="gray" size="label">
          {image.name}
        </Text>
      </div>
    </div>
  );
}
