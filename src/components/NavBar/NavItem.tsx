import Link from "next/link";
import styles from "./style.module.css";
import { useRouter } from "next/router";

interface Props {
  name: string;
  path: string;
}

export function NavItem(props: Props) {
  const { name, path } = props;

  const router = useRouter();

  const isOpen = router.asPath === path;

  return (
    <li data-open={isOpen} className={styles.navitem}>
      <Link href={path}>{name}</Link>
    </li>
  );
}
