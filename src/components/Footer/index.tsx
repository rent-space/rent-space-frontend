import styles from "./styles.module.css";

interface Props {
  children?: React.ReactNode;
  justify?: "center" | "left" | "right";
  separator?: boolean;
}

export function Footer(props: Props) {
  const { justify = "center", children, separator = false } = props;
  return (
    <footer
      className={styles.footer}
      data-justify={justify}
      data-separator={separator}
    >
      {children}
    </footer>
  );
}
