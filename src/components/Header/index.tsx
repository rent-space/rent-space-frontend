import styles from "./style.module.css";
import Image from "next/image";
import { NavBar } from "@/components/NavBar";
import { useRouter } from "next/router";
import { Button } from "@/components/Button";
import { UserAvatar } from "../UserAvatar";

interface Props {
  userLoggedIn?: boolean; // Temporary Prop, will be replaced by an API call in the future
}

export function Header(props: Props) {
  const { userLoggedIn } = props;

  const router = useRouter();

  const login = () => {
    router.push("/home");
  };

  const navigateToHome = () => {
    router.push("/home");
  };

  return (
    <div className={styles.header}>
      <Image
        src="/logo.svg"
        alt="RentSpace Logo"
        width={129}
        height={62}
        onClick={navigateToHome}
        className={styles.logo}
      />
      {userLoggedIn ? (
        <>
          <NavBar />
          <UserAvatar />
        </>
      ) : (
        <div className={styles.ladingPageButtons}>
          <Button variant="primary" onClick={login} size="small">
            Login
          </Button>
          <Button variant="secondary" size="small">
            Cadastrar
          </Button>
        </div>
      )}
    </div>
  );
}
