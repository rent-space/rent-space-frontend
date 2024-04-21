import Image from "next/image";

import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import styles from "./styles.module.css";
import WaitLoading from "@/assets/waitLoading.svg";
import { User } from "@/utils/types";

export default function LoginLoader() {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(status, data);
    if (status === "authenticated") {
      if ((data.user as User).id) {
        router.push("/home");
      } else {
        router.push("/select-user-type");
      }
    }
  }, [status, router, data]);

  return (
    <section className={styles.loadingLoginPage}>
      <Image src={WaitLoading} alt="Aguardando login" width={650} />
      <Loading loadingLabel="Finalizando login" />
    </section>
  );
}
