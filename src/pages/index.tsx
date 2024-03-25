import Image from "next/image";
import LogoImg from '@/assets/rentspace_logo.svg';
import HomeImg from '@/assets/home.svg';
import { Button } from "@/components/Button";

import styles from './styles.module.css';
import { TermCondition } from "@/components/TermConditions";

export default function Home() {
  return (
    <div>
      <section className={styles.header}>
        <Image src={LogoImg} width={129} height={62} alt="Logo" />

        <Button>Login</Button>
      </section>

      <div className={styles.pageContent}>
        <section className={styles.homeInformations}>
          <h1 className={styles.homeTitle}>Encontre o lugar perfeito para a sua próxima <span>comemoração.</span></h1>

          <span className={styles.appDescription}>Reserve um espaço, contrate um serviço, se preocupe com a diversão da sua festa,
            simplifique a dor de cabeça da organização conosco.
          </span>

          <ul className={styles.appFunctionalities}>
            <li>Encontre o espaço perfeito.</li>
            <li>Contrate os melhores serviços.</li>
            <li>Aproveite 100% da sua festa.</li>
          </ul>
          <TermCondition />
          <Button aditionalStyles={styles.planButton}>Planejar agora</Button>
        </section>

        <section className={styles.homeImageCont}>
          <div className={styles.blurEffect} />
          <Image src={HomeImg} alt="Home image" className={styles.homeImg} />
        </section>
      </div>

      <section className={styles.footer}>
        <span className={styles.appFunctionalities}>Contato * Termos de uso</span>
      </section>
    </div>
  )
}
