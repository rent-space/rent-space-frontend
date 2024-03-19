import { ReactNode } from "react";
import styles from "./style.module.css";
import Image from "next/image";

interface Props {
  children?: ReactNode;
}

export function Header(props: Props) {
  const { children } = props;

  return (
    <div className={styles.header}>
      <Image src="/logo.svg" alt="RentSpace Logo" width={129} height={62} />
      {children}
    </div>
  );
}
