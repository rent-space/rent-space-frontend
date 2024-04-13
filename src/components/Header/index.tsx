import styles from "./style.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  justify?: "space-between" | "center";
  navigateBackTo?: "/home" | "/spaces" | "/services" | "/";
  children?: React.ReactNode;
}

export function Header(props: Props) {
  const {
    justify = "space-between",
    children,
    navigateBackTo = "/home",
  } = props;

  const router = useRouter();

  const logoIsClickable = router.asPath !== "/" && router.asPath !== "/home";

  const navigateToHome = () => {
    if (logoIsClickable) {
      router.push(navigateBackTo);
    }
  };

  return (
    <div className={styles.header} data-justify={justify}>
      <Image
        src="/logo.svg"
        alt="RentSpace Logo"
        width={129}
        height={62}
        onClick={navigateToHome}
        className={styles.logo}
        data-click={logoIsClickable}
      />
      {children}
    </div>
  );
}
