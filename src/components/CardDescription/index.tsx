import Image from "next/image";
import styles from "./styles.module.css";
import { ButtonHTMLAttributes } from "react";
import { FiCameraOff } from "react-icons/fi";

type CardProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  description?: string;
  maxCapacity?: number;
  pricePerHour?: number;
  pricePerUnity?: number;
  image: string;
  onClick: () => void;
};

export function CardDescription({
  title,
  description,
  maxCapacity,
  pricePerHour,
  pricePerUnity,
  image,
  onClick,
}: CardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageContainer}>
        {image.length && image.includes("base64") ? (
          <Image src={image} alt="Imagem do Espaço" width={175} 
            layout="contain"
            height={225} className={styles.image}
          />
        ) : (
          <div className={styles.noImagePlace}>
            <FiCameraOff color="#FFF" size={32} />
          </div>
        )}
      </div>
      <div className={styles.descriptionSide}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        { maxCapacity ? <div className={styles.maxCapacity}>~{maxCapacity} Pessoas</div> : ''}
        <div className={styles.price}>R$ {pricePerHour ? `${pricePerHour}/h` : pricePerUnity}</div>
      </div>
    </div>
  );
}
