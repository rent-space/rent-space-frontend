import Image from "next/image";
import styles from "./styles.module.css";
import detailsPrincipal from "@/assets/detailsTop.svg";
import { Text } from "../Text";
import { Space } from "@/utils/types";
import { Button } from "../Button";

interface Props {
  space: Space;
  children: React.ReactNode;
  openModal: () => void;
}

export function DetailsSpace(props: Props) {
  const { space, children, openModal } = props;

  const {
    title,
    description,
    maximumCapacity,
    pricePerHour,
    address,
    neighborhood,
    city,
    zipCode,
    media,
  } = space;

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

        <Text size="subtitle" color="gray" weight="regular">
          {description}
        </Text>

        <div className={styles.infoDetails}>
          <div className={styles.textBox}>
            <div>
              <Text size="subtitle" weight="semibold">
                Informações básicas
              </Text>
              <ul className={styles.list}>
                <li>Até {maximumCapacity} pessoas</li>
                <li>R$ {pricePerHour}/h </li>
              </ul>
            </div>

            <div className={styles.address}>
              <Text size="subtitle" weight="semibold">
                Endereço
              </Text>

              <Text size="body" color="gray" weight="regular">
                {address} - {neighborhood}, {city} - {zipCode}
              </Text>
            </div>

            <div>
              <Button variant="primary" size="small" onClick={openModal}>
                Reservar
              </Button>
            </div>
          </div>
          <div className={styles.card}>{children}</div>
        </div>
      </div>
    </div>
  );
}
