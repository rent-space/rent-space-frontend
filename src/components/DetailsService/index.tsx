import Image from "next/image";
import styles from "./styles.module.css";
import { Text } from "../Text";
import { Service, USER_TYPES } from "@/utils/types";
import { useEffect, useState } from "react";
import { FiCameraOff } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { EditButton } from "../EditButton";
import { DeleteButton } from "../DeleteButton";

interface Props {
  service: Service;
  children: React.ReactNode;
  openReserveModal?: () => void;
  openDeleteModal: () => void;
}

export function DetailsService(props: Props) {
  const [mainImage, setMainImage] = useState<string>();
  const [anotherImages, setAnotherImages] = useState<string[]>([]);
  const [maxImagesShowed, setMaxImagesShowed] = useState<number>(3);
  const [showAllImages, setShowAllImages] = useState<boolean>(false);
  const { service, children, openReserveModal, openDeleteModal } = props;

  const { data } = useSession();

  const isEventOwner =
    data?.user && data?.user?.userType === USER_TYPES.EVENT_OWNER;

  const {
    title,
    description,
    serviceNature,
    pricePerHour,
    address,
    peopleInvolved,
    city,

    media,
  } = service;

  useEffect(() => {
    if (media.length > 0) {
      let [firstImg, ...rest] = media.filter((img) => img.includes("base64"));
      setMainImage(firstImg);
      setAnotherImages(rest);
    }
  }, [service]);

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
              alt="Service image"
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
            <EditButton id={service.id} ownerId={service.owner.id} />
            <DeleteButton
              openDeleteModal={openDeleteModal}
              ownerId={service.owner.id}
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
                <li>Natureza: {serviceNature}</li>
                <li>Até {peopleInvolved} funcionários</li>
                <li>R$ {pricePerHour}/h </li>
              </ul>
            </div>

            <div className={styles.address}>
              <Text size="subtitle" weight="semibold">
                Endereço
              </Text>

              <Text size="body" color="gray" weight="regular">
                {address} - {city}
              </Text>
            </div>
          </div>
          <div className={styles.card}>{children}</div>
        </div>
      </div>
    </div>
  );
}
