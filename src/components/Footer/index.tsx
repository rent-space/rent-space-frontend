import styles from "./styles.module.css";

interface Props extends React.HTMLProps<HTMLDivElement>{
  children?: React.ReactNode;
  justify?: "center" | "left" | "right";
  separator?: boolean;
}

export function Footer(props: Props) {
  const { justify = "center", children, separator = false, className} = props;
  return (
    <footer
      className={`${styles.footer} ${className}`}
      data-justify={justify}
      data-separator={separator}
    >
      {children}
    </footer>
  );
}
