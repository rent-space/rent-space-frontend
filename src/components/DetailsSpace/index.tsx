import Image from "next/image";
import styles from "./styles.module.css";
import detailsPrincipal from "@/assets/detailsTop.svg";
import { Text } from "../Text";

type DetailsSpaceProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  maximumCapacity: number;
  pricePerHour: number;
  address?: string;
  servicesAvailable?: string[];
};

export function DetailsSpace({
  title,
  description,
  children,
  maximumCapacity,
  pricePerHour,
  address,
}: DetailsSpaceProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <div className={styles.topImage}>
          <Image
            className={styles.topImage}
            src={detailsPrincipal}
            alt="Imagem principal"
          />
        </div>
        <div className={styles.bottomImage}>
          <div className={styles.leftImage}>
            <Image
              className={styles.sided}
              src={detailsPrincipal}
              alt="Imagem principal"
            />
            <Image
              className={styles.sided}
              src={detailsPrincipal}
              alt="Imagem principal"
            />
          </div>
          <div className={styles.rightImage}>
            <Image
              className={styles.sided}
              src={detailsPrincipal}
              alt="Imagem principal"
            />
            <button className={styles.viewMore}>Ver mais...</button>
          </div>
        </div>
      </div>
      <div className={styles.detailsBox}>
        <Text size="title2" weight="semibold" color="orange">
          {title}
        </Text>

        <Text size="subtitle" color="gray">
          {description}
        </Text>

        <div className={styles.infoDetails}>
          <div className={styles.textBox}>
            <div className={styles.subinfoTitle}>
              <Text size="section">Informações básicas</Text>
              <ul>
                <li>Até {maximumCapacity} pessoas</li>
                <li>R$ {pricePerHour}/h </li>
              </ul>
            </div>

            <div className={styles.subinfoTitle}>
              <span>Endereço</span>
              <p>{address}</p>
            </div>
          </div>

          <div className={styles.detailsCardBox}>{children}</div>
        </div>
      </div>
    </div>
  );
}
