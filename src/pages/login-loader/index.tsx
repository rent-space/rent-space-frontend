import Image from "next/image";

import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import styles from './styles.module.css';
import WaitLoading from '@/assets/waitLoading.svg';
import { getUser } from "@/services/api/userService";
import { User } from "@/utils/types";

export default function LoginLoader() {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function userCreationOrLogin() {
      console.log(status, data)
      if (status === "authenticated") {
        if (data.user?.email) {
          const user: User = await getUser(data.user?.email);

          if (!user) {
            router.push("/select-user-type")
          } else {
            router.push("/home");
          }
        }
      } 
    }

    userCreationOrLogin();
  }, [status, router])

  return (
    <section className={styles.loadingLoginPage}>
      <Image
        src={WaitLoading}
        alt="Aguardando login"
        width={650}
      />
      <Loading loadingLabel="Finalizando login" />
    </section>
  )
}