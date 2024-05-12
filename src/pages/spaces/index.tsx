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
import { ChangeEvent, useEffect, useState } from "react";
import { getSpaces } from "@/services/api/space";
import { AllSpaces } from "@/utils/types";
import Loading from "@/components/Loading";
import { SearchBar } from "@/components/SearchBar";

const PAGE_SIZE = 6;

export default function Spaces() {
  const [spaces, setSpaces] = useState<AllSpaces>([]);
  const [cards, setCards] = useState<AllSpaces>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(spaces.length / PAGE_SIZE);
  const router = useRouter();

  useEffect(() => {
    getSpaces().then((response) => {
      setLoading(false);
      setSpaces(response.sort((a, b) => b.id - a.id));
    });
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const updatedCards = spaces.slice(startIndex, endIndex);
    setCards(updatedCards);
  }, [page, spaces]);

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

  const navigateToDetailsSpace = (id: number) => {
    router.push(`/space/${id}`);
  };

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  function setCurrentSearch(search:string) {
    const url = new URL(window.location.toString());
    url.searchParams.set('search', search);
    window.history.pushState({},"",url);
    setSearch(search);
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setPage(1)
  }

  return (
    <>
      <Header>
        <NavBar />
        <UserAvatar />
      </Header>
      <SearchBar search={search} onSearchInputChanged={()=>onSearchInputChanged}/>
      <FloatingButton />
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>Espaços para alugar</span>
        </div>

        <div className={styles.listContainer}>
          {loading
            ? Array.from(Array(6).keys()).map((_, i) => (
                <div className={`${styles.card} ${styles.loadingCard}`} key={i}>
                  <Loading key={i} loadingLabel="Carregando..." />
                </div>
              ))
            : cards.map((card, i) => {
                return (
                  <div className={styles.card} key={i}>
                    <CardDescription
                      key={card.id}
                      title={card.title}
                      maxCapacity={card.maximumCapacity}
                      description={card.description}
                      image={card.media?.length ? card.media[0] : ""}
                      pricePerHour={card.pricePerHour}
                      onClick={() => navigateToDetailsSpace(card.id)}
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
                  <span key={indice} className={styles.currentPage}>{`${
                    indice + 1
                  } `}</span>
                ) : (
                  <span key={indice}>{`${indice + 1} `}</span>
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
