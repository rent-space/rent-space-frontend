import { Header } from "@/components/Header";

import Image from "next/image";
import HomeImg from "@/assets/home.svg";
import { Button } from "@/components/Button";

import styles from "./styles.module.css";
import { IconArrowRight } from "@/components/Icons/IconArrowRight";

export default function LandingPage() {
  return (
    <div>
      <Header />

      <div className={styles.pageContent}>
        <section className={styles.homeInformations}>
          <h1 className={styles.homeTitle}>
            Encontre o lugar perfeito para a sua próxima
            <span> comemoração.</span>
          </h1>

          <span className={styles.appDescription}>
            Reserve um espaço, contrate um serviço, se preocupe com a diversão
            da sua festa, simplifique a dor de cabeça da organização conosco.
          </span>

          <div className={styles.appFunctionalities}>
            <span>
              <IconArrowRight />
              <p>Encontre o espaço perfeito.</p>
            </span>
            <span>
              <IconArrowRight />
              <p>Contrate os melhores serviços.</p>
            </span>
            <span>
              <IconArrowRight />
              <p>Aproveite 100% da sua festa.</p>
            </span>
          </div>

          <Button variant="primary" size="large">
            Planejar agora
          </Button>
        </section>

        <section className={styles.homeImageCont}>
          <div className={styles.blurEffect} />
          <Image src={HomeImg} alt="Home image" className={styles.homeImg} />
        </section>
      </div>

      <section className={styles.footer}>
        <span className={styles.appFunctionalities}>
          Contato * Termos de uso
        </span>
      </section>
    </div>
  );
}
