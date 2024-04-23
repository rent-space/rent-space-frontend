import { Card } from "@/components/AuthCard";
import { Header } from "@/components/Header";
import { IconAccountCircle } from "@/components/Icons/IconAccountCircle";
import { NavBar } from "@/components/NavBar";
import { UserAvatar } from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import styles from './styles.module.css';
import StatusTag from "@/components/StatusTag";

interface PageDataProps {
  title: string
}

const PageCard = () => {
  return (
    <Card hasMargin={false} aditionalStyles={styles.cardStyle}>
      <div></div>

      <section className={styles.cardInfoCont}>
        <strong className={styles.cardTitle}>Espaço verde</strong>
        <strong className={styles.cardInfo}>Dia:{" "}
          <span className={styles.cardInfoValue}>24/08/2024</span>
        </strong>
        <strong className={styles.cardInfo}>Horário:{" "}
          <span className={styles.cardInfoValue}>24/08/2024</span>
        </strong>
        <strong className={styles.cardInfo}>Qnt. pessoas:{" "}
          <span className={styles.cardInfoValue}>450</span>
        </strong>
        <strong className={styles.cardInfo}>Valor:{" "}
          <span className={styles.cardInfoValue}>24/08/2024</span>
        </strong>

        <StatusTag status="pending" tagText="PENDENTE" />
      </section>
      
      <section className={`${styles.cardInfoCont} ${styles.userInfoCont}`}>
        <strong className={styles.userInfoTitle}>Solicitado por:</strong>

        <IconAccountCircle />
        <strong className={styles.userName}>Juanita</strong>
        <span className={styles.userInfo}>juanita@gmail.com</span>
        <span className={styles.userInfo}>(83) 9100000000</span>
      </section>
    </Card>
  )
}

export default function RequestedSolicitations() {
  const { data } = useSession();
  const [pageData, setPageData] = useState<PageDataProps>({
    title: ''
  });

  useEffect(() => {
    console.log(data)
    let pageTitle = "Solicitações"

    if (data?.user?.userType === 'SPACE_OWNER' || data?.user?.userType === 'SERVICE_OFFER') {
      pageTitle = "Solicitações recebidas"
    } else if (data?.user?.userType === 'EVENT_OWNER') {
      pageTitle = "Suas reservas"
    }

    setPageData({
      ...pageData,
      title: pageTitle
    })
  }, [data])

  return (
    <>
      <Header>
        <NavBar />
        <UserAvatar />
      </Header>

      <section className={styles.container}>
        <h1 className={styles.pageTitle}>{pageData.title}</h1>

        <div className={styles.cardsContainer}>
          <span className={styles.sectionTitle}>Solicitações pendentes</span>

          <div className={styles.cards}>
            {[1,2,3].map(index => (
              <PageCard key={index}/>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}