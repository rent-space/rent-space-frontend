import Image from "next/image";
import styles from "./styles.module.css";
import { Text } from "../Text";
import { Space } from "@/utils/types";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { FiCameraOff } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { EditButton } from "../EditButton";
import { DeleteButton } from "../DeleteButton";

interface Props {
  space: Space;
  children: React.ReactNode;
  openModal: () => void;
  openDeleteModal: () => void;
}

export function DetailsSpace(props: Props) {
  const [mainImage, setMainImage] = useState<string>();
  const [anotherImages, setAnotherImages] = useState<string[]>([]);
  const [maxImagesShowed, setMaxImagesShowed] = useState<number>(3);
  const [showAllImages, setShowAllImages] = useState<boolean>(false);
  const { space, children, openModal, openDeleteModal } = props;

  const { data } = useSession();

  const isEventOwner = data?.user && data?.user?.userType === "EVENT_OWNER";

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

  useEffect(() => {
    if (media.length > 0) {
      let [firstImg, ...rest] = media.filter((img) => img.includes("base64"));
      setMainImage(firstImg);
      setAnotherImages(rest);
    }
  }, [space]);

  const openImages = () => {
    setMaxImagesShowed(anotherImages.length);
    setShowAllImages(true);
  };

  const hideImages = () => {
    setMaxImagesShowed(3);
    setShowAllImages(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <div className={styles.topImage}>
          {mainImage ? (
            <Image
              className={styles.topImage}
              layout="fill"
              src={mainImage}
              alt="Imagem principal"
            />
          ) : (
            <div className={styles.noImagePlace}>
              <FiCameraOff color="#FFF" size={32} />
            </div>
          )}
        </div>
        <div className={styles.bottomImage}>
          {anotherImages.slice(0, maxImagesShowed).map((image, i) => (
            <Image
              key={i}
              className={styles.sided}
              src={image}
              layout="fill"
              alt="Place image"
            />
          ))}
          {anotherImages.length > 4 && !showAllImages && (
            <button className={styles.viewMore} onClick={openImages}>
              Ver mais...
            </button>
          )}
          {anotherImages.length > 4 && showAllImages && (
            <button className={styles.viewLess} onClick={hideImages}>
              Mostrar menos...
            </button>
          )}
        </div>
      </div>
      <div className={styles.detailsBox}>
        <div className={styles.inline}>
          <Text size="title2" weight="semibold" color="orange">
            {title}
          </Text>
          <div className={styles.buttons}>
            <EditButton id={space.id} ownerId={space.owner.id} />
            <DeleteButton
              openDeleteModal={openDeleteModal}
              ownerId={space.owner.id}
            />
          </div>
        </div>

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

            {isEventOwner && (
              <div>
                <Button variant="primary" size="small" onClick={openModal}>
                  Reservar
                </Button>
              </div>
            )}
          </div>
          <div className={styles.card}>{children}</div>
        </div>
      </div>
    </div>
  );
}
