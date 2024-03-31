import styles from "./styles.module.css";

interface Props {
  children?: React.ReactNode;
  justify?: "center" | "left" | "right";
}

export function Footer(props: Props) {
  const { justify = "center", children } = props;
  return (
    <footer className={styles.footer} data-justify={justify}>
      {children}
    </footer>
  );
}
