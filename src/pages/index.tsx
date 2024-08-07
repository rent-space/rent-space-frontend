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
import { useRouter } from "next/router";
import { useEffect } from "react";
import { healthCheck } from "@/services/api/health";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function LandingPage() {
  const router = useRouter();

  const { status } = useSession();

  const t = useTranslations("landing-page");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [router, status]);

  const apiHealthCheck = async () => {
    try {
      await healthCheck();
    } catch (error) {}
  };

  useEffect(() => {
    apiHealthCheck();
  }, []);

  return (
    <>
      <Header>
        <div className={styles.login}>
          <LanguageSelector />
          <Button
            onClick={() => signIn("google", { callbackUrl: "/login-loader" })}
            variant="primary"
            size="small"
          >
            {t("login")}
          </Button>
          <Button
            onClick={() => signIn("google", { callbackUrl: "/login-loader" })}
            variant="secondary"
            size="small"
          >
            {t("register")}
          </Button>
        </div>
      </Header>
      <Page>
        <div className={styles.home}>
          <section className={styles.homeInformations}>
            <h1 className={styles.homeTitle}>
              {t("title-1")}
              <span> {t("title-2")}</span>
            </h1>

            <span className={styles.appDescription}>{t("description")}</span>

            <div className={styles.appFunctionalities}>
              <span>
                <IconArrowRight />
                <p>{t("functionality-list-1")}</p>
              </span>
              <span>
                <IconArrowRight />
                <p>{t("functionality-list-2")}</p>
              </span>
              <span>
                <IconArrowRight />
                <p>{t("functionality-list-3")}</p>
              </span>
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
          {t("contact")} &#x2022; {t("terms")}
        </Text>
      </Footer>
    </>
  );
}
