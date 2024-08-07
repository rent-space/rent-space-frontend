import { FloatingButton } from "@/components/FloatingButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { UserAvatar } from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { CardDescription } from "@/components/CardDescription";
import { AllServices } from "@/utils/types";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { getServices } from "@/services/api";
import { useTranslations } from "next-intl";

const PAGE_SIZE = 6;

export default function Services() {
  const router = useRouter();
  const t = useTranslations();

  const [loading, setLoading] = useState<Boolean>(true);
  const [services, setServices] = useState<AllServices>([]);
  const [cards, setCards] = useState<AllServices>([]);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(services.length / PAGE_SIZE);

  const handleNavigateServiceDetails = (id: number) => {
    router.push(`/service/${id}`);
  };

  const goToNextPage = () => {
    if (totalPages > page) {
      return setPage(page + 1);
    }
  };

  useEffect(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const updatedCards = services.slice(startIndex, endIndex);
    setCards(updatedCards);
  }, [page, services]);

  useEffect(() => {
    getServices().then((response) => {
      setLoading(false);
      setServices(response.sort((a, b) => b.id - a.id));
    });
  }, []);

  const goToPreviousPage = () => {
    if (page > 1) {
      return setPage(page - 1);
    }
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
      <FloatingButton route="service" />
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>{t("services-to-rent")} </span>
        </div>

        <div className={styles.listContainer}>
          {loading
            ? Array.from(Array(6).keys()).map((_, i) => (
                <div className={`${styles.card} ${styles.loadingCard}`} key={i}>
                  <Loading key={i} loadingLabel="Carregando..." />
                </div>
              ))
            : cards.map((service) => {
                return (
                  <div className={styles.card} key={service.id}>
                    <CardDescription
                      key={service.id}
                      title={service.title}
                      image={service.firstMedia}
                      pricePerHour={service.pricePerHour}
                      description={service.description}
                      onClick={() => handleNavigateServiceDetails(service.id)}
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
