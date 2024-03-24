"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import LogoImg from '@/assets/rentspace_logo.svg';
import HomeImg from '@/assets/home.svg';
import { Button } from "@/components/Button";

import { signIn, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'

import styles from './styles.module.css';
import { BuiltInProviderType } from "next-auth/providers/index";
import { useRouter } from "next/navigation";

export default function Home() {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, [])

  useEffect(() => {
    router.push("/logged")
  }, [session])
  
  return (
    <div>
      <section className={styles.header}>
        <Image src={LogoImg} width={129} height={62} alt="Logo" />

        {providers && Object.values(providers).map(provider => (
          <Button
            key={provider.name}
            onClick={() => signIn(provider.id)}
          >Login</Button>
        ))}
      </section>

      <div className={styles.pageContent}>
        <section className={styles.homeInformations}>
          <h1 className={styles.homeTitle}>Encontre o lugar perfeito para a sua próxima <span className={styles.orangeText}>comemoração.</span></h1>

          <span className={styles.appDescription}>Reserve um espaço, contrate um serviço, se preocupe com a diversão da sua festa,
            simplifique a dor de cabeça da organização conosco.
          </span>

          <ul className={styles.appFunctionalities}>
            <li>Encontre o espaço perfeito.</li>
            <li>Contrate os melhores serviços.</li>
            <li>Aproveite 100% da sua festa.</li>
          </ul>

          <Button aditionalStyles={styles.planButton}>Planejar agora</Button>
        </section>

        <section className={styles.homeImageCont}>
          <div className={styles.blurEffect} />
          <Image src={HomeImg} alt="Home image" className={styles.homeImg} />
        </section>
      </div>

      <section className={styles.footer}>
        <span className={styles.appFunctionalities}>Contato</span>
        <span className={styles.bulletPoint}>{'\u2B24'}</span>
        <span className={styles.appFunctionalities}>Termos de uso</span>
      </section>
    </div>
  )
}