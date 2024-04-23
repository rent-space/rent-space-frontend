import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { UserAvatar } from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CardDescription } from "@/components/CardDescription";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import styles from "./styles.module.css";
import { FloatingButton } from "@/components/FloatingButton";
import { useEffect, useState } from "react";
import { getSpace, getSpaces } from "@/services/api/space";
import { AllSpaces, Space } from "@/utils/types";

const PAGE_SIZE = 9;

export default function Spaces() {
  const [allSpaces, setAllSpaces] = useState<AllSpaces>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<Space[]>([]);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allSpaces.length / PAGE_SIZE);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getSpaces().then((response) => setAllSpaces(response));
  }, []);

  useEffect(() => {
    allSpaces.forEach((space, i) =>
      getSpace(space.id).then((response) => {
        setSpaces((prevSpaces) => [...prevSpaces, response]);
        if (i == allSpaces.length - 1) {
          setLoading(false);
        }
      })
    );
  }, [allSpaces]);

  useEffect(() => {
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    const updatedCards = spaces
      .slice(startIndex, endIndex)
      .sort((a, b) => a.title.localeCompare(b.title));

    !loading && setCards(updatedCards);
  }, [loading, page, spaces]);

  const goToPreviousPage = () => {
    if (page > 1) {
      return setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (totalPages > page) {
      return setPage(page + 1);
    }
  };

  const navigateToDetailsSpace = () => {
    router.push("/space/details");
  };

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  return (
    <>
      <Header>
        <NavBar />
        <UserAvatar />
      </Header>

      <FloatingButton />
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>Espaços para alugar</span>
        </div>

        <div className={styles.listContainer}>
          {!loading &&
            cards.map((card, i) => {
              return (
                <div className={styles.card} key={i}>
                  <CardDescription
                    title={card.title}
                    maxCapacity={card.maximumCapacity}
                    description={card.description}
                    image=""
                    pricePerHour={card.pricePerHour}
                    onClick={navigateToDetailsSpace}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <Footer justify="center" className={styles.footer}>
        <SlArrowLeft
          className={styles.footerArrow}
          onClick={goToPreviousPage}
        />
        <div className={styles.footerPage}>
          {Array.from({ length: totalPages }).map((_, indice) => {
            return (
              <>
                {page == indice + 1 ? (
                  <span className={styles.currentPage}>{`${indice + 1} `}</span>
                ) : (
                  <span>{`${indice + 1} `}</span>
                )}
              </>
            );
          })}
        </div>
        <SlArrowRight className={styles.footerArrow} onClick={goToNextPage} />
      </Footer>
    </>
  );
}
