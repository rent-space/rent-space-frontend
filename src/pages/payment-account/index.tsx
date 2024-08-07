import { Button } from "@/components/Button";
import { createExpressAccount } from "@/services/api/payment";
import { useState } from "react";

import styles from "./styles.module.css";
import ConfigurationsImage from "@/assets/configurations.svg";
import Image from "next/image";
import { Input } from "@/components/Input";
import { useSession } from "next-auth/react";
import { setUserAccountId } from "@/services/api/user";

export default function PaymentAccount() {
  const { data: sessionData, update } = useSession();
  const [email, setEmail] = useState<string>('');
  const [accountLink, setAccountLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    createExpressAccount(email).then(data => {
      if (sessionData) {
        setUserAccountId(data.accountId, sessionData?.user.id);
        update((prev: any) => ({...prev, accountId: data.accountId }))
      }
      setAccountLink(data.accountLink);
    }).catch(error => {
      console.log(error)
    }).finally(() => setLoading(false));
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Vamos iniciar a criação da sua conta de recebimento!</h1>
      <Image
        src={ConfigurationsImage}
        className={styles.pageImage}
        alt="Configuração de conta de recebimento"
      />

      {!accountLink &&
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="email"
            name="email"
            label="Infome o seu email"
            placeholder="email@provider.com"
            value={email}
            setValue={setEmail}
            required
          />
          <Button variant="primary" size="large" type="submit" disabled={!!accountLink || loading}>
            Create Account
          </Button>
        </form>
      }

      {accountLink &&
        <div className={styles.accountCreatedCont}>
          <h2>Sua conta foi iniciada com sucesso! Finalize os dados no link abaixo:</h2>
          <a href={accountLink} target="_blank">Concluir configuração</a>
        </div>
      }
    </div>
  )
}