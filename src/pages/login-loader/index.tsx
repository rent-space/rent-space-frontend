import Image from "next/image";

import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import styles from "./styles.module.css";
import WaitLoading from "@/assets/waitLoading.svg";

export default function LoginLoader() {
  const { status, data, update } = useSession();
  const router = useRouter();

  const redirectAfterAuth = useCallback(async () => {
    if (status === "authenticated") {
      if (data?.user && !data?.user?.id) {
        router.push("/select-user-type");
      } else {
        router.push("/home");
      }
    } else {
      update();
    }
  }, [status]);

  useEffect(() => {
    redirectAfterAuth();
  }, [redirectAfterAuth]);

  return (
    <section className={styles.loadingLoginPage}>
      <Image src={WaitLoading} alt="Aguardando login" width={650} />
      <Loading loadingLabel="Finalizando login" />
    </section>
  );
}
