import Image from "next/image";

import Loading from "@/components/Loading";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import styles from "./styles.module.css";
import WaitLoading from "@/assets/waitLoading.svg";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export default function LoginLoader() {
  const { status, data, update } = useSession();
  const router = useRouter();
  const t = useTranslations();

  const redirectAfterAuth = useCallback(async () => {
    switch (status) {
      case "loading":
        update();
        break;
      case "unauthenticated":
        toast.error("Erro ao autenticar usuário");
        await signOut({ callbackUrl: "/" });
        break;
      case "authenticated":
        if (data?.user && !data?.user?.id) {
          router.push("/select-user-type");
        } else {
          router.push("/home");
        }
        break;
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
