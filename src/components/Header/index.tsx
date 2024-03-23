import styles from "./style.module.css";
import Image from "next/image";
import { NavBar } from "../NavBar";
import { useRouter } from "next/router";

interface Props {
  userLoggedIn?: boolean;
}

export function Header(props: Props) {
  const { userLoggedIn } = props;

  const router = useRouter();

  const logout = () => {
    router.push("/");
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
      {userLoggedIn && (
        <>
          <NavBar />
          <div onClick={logout}>Log out</div>
        </>
      )}
    </div>
  );
}
