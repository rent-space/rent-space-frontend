import Image from "next/image";

import ItWorked from "@/assets/it_worked.svg";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";

import styles from "./styles.module.css";

export default function PaymentAccountCreated() {
  const router = useRouter();

  const redirectToHome = () => {
    router.push(`/home`);
  }

  return (
    <div className={styles.pageContainer}>
      <Image className={styles.pageImage} src={ItWorked} alt="Conta criada"></Image>
      <h2 className={styles.successMessage}>Conta criada com sucesso!</h2>
      <span className={styles.successDesc}>Agora você pode oferecer serviços e espaços para os usuários e receber pagamentos 
        diretamente pela nossa plataforma na conta que você cadastrou nesse instante! Vamos lá.
      </span>

      <Button size="large" variant="primary" onClick={redirectToHome}>Página Inicial</Button>
    </div>
  )
}