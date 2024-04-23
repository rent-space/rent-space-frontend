import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { NavBar } from "@/components/NavBar";
import { UserAvatar } from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import HomeImage from "@/assets/home_image.svg";
import { useRouter } from "next/router";
import styles from './styles.module.css';
import { CardDescription } from "@/components/CardDescription";
import mock from '../spaces/mock';
import MockImage from '@/assets/noImageFile.svg';

export default function Home() {
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const navigateToListSpace = () => {
    router.push("/spaces");
  };

  const navigateToDetailsSpace = () => {
    router.push("/space/details");
  };

  return (
    <>
      <Header>
        <NavBar />
        <UserAvatar />
      </Header>
      <div className={styles.container}>
        <Image
          src={HomeImage}
          alt="RentSpace Logo"
          style={{filter: "brightness(0.5)"}}
          height={406}
        />  
        <div className={styles.overlayText}>
          <div className={styles.titleContainer}>
            <span className={styles.eventPhrase}>Vamos organizar esse</span>
            <span className={styles.eventPhraseBold}>EVENTO ?</span>
          </div>
          <div className={styles.subtitleContainer}>
            <span className={styles.subtitle}>Seja bem-vindo!  Estamos aqui para oferecer
            as principais necessidades para que você tenha o evento perfeito sem qualquer preocupação!</span>
          </div>
        </div>

        <div className={styles.textContainer}>
          <span className={styles.spaceText}>
            Principais Espaços
          </span>
          <button className={styles.seeAll} onClick={navigateToListSpace}>
            Ver todos
          </button>
        </div>
        <div className={styles.cardContainer}>
          {mock.slice(0,5).map((card,index) => {
            return (
            <div key={index}>
            <CardDescription
              description={card.description}
              title={card.title}
              image={MockImage}
              onClick={navigateToDetailsSpace}
              maxCapacity={card.maxPeople}
              pricePerHour={card.pricePerHour}
            />
            </div>
          )})}
        </div>
      </div>
    </>
  );
}
