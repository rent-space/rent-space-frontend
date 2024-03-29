import styles from "./styles.module.css";

interface Props {
  children?: React.ReactNode;
}

export function Footer(props: Props) {
  return <footer className={styles.footer}>{props.children}</footer>;
}
