"use client";

import Image from "next/image";
import HomeImg from "@/assets/home.svg";
import { Button } from "@/components/Button";
import { signIn, useSession } from "next-auth/react";

import styles from "./styles.module.css";
import { IconArrowRight } from "@/components/Icons/IconArrowRight";
import { Text } from "@/components/Text";
import { Page } from "@/components/Page";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getUser } from "@/services/api/userService";
import { User } from "@/utils/types";

export default function LandingPage() {
  const { status, data } = useSession();

  const router = useRouter();

  // useEffect(() => {
  //   async function userCreationOrLogin() {
  //     if (status === "authenticated") {
  //       if (data.user?.email) {
  //         const user: User = await getUser(data.user?.email);
  //         console.log(user)
  //         if (!user) {
  //           router.push("/select-user-type")
  //         } else {
  //           router.push("/home");
  //         }
  //       }
  //     } 
  //   }

  //   userCreationOrLogin();
  // }, [router, status]);

  return (
    <>
      <Header>
        <div className={styles.login}>
          <Button
            onClick={() => signIn("google", { callbackUrl: "/login-loader" })}
            variant="primary"
            size="small"
          >
            Login
          </Button>
          <Button 
            onClick={() => signIn("google", { callbackUrl: "/login-loader" })}
            variant="secondary" size="small"
          >
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
        <Text size="section" color="gray">
          Contato &#x2022; Termos de uso
        </Text>
      </Footer>
    </>
  );
}
