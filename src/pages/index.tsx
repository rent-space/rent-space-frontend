import Image from "next/image";
import HomeImg from "@/assets/home.svg";
import { Button } from "@/components/Button";

import styles from "./styles.module.css";
import { IconArrowRight } from "@/components/Icons/IconArrowRight";
import { Text } from "@/components/Text";
import { Page } from "@/components/Page";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();

  const login = () => {
    router.push("/home");
  };

  return (
    <>
      <Header>
        <div className={styles.login}>
          <Button variant="primary" onClick={login} size="small">
            Login
          </Button>
          <Button variant="secondary" size="small">
            Cadastrar
          </Button>
        </div>
      </Header>
      <Page>
        <div className={styles.home}>
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

            <div>
              <Button variant="primary" size="large">
                Planejar agora
              </Button>
            </div>
          </section>

          <div className={styles.homeImageCont}>
            <div className={styles.blurEffect} />
            <Image src={HomeImg} alt="Home image" className={styles.homeImg} />
          </div>
        </div>
      </Page>
      <Footer>
        <Text variant="section" tone="secondary">
          Contato &#x2022; Termos de uso
        </Text>
      </Footer>
    </>
  );
}
