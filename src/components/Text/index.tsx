import styles from "./style.module.css";

interface Props {
  variant: "body" | "title" | "section";
  tone: "primary" | "secondary";
  children: React.ReactNode;
}

export function Text(props: Props) {
  const { variant, children, tone } = props;

  return (
    <span data-variant={variant} data-tone={tone} className={styles.text}>
      {children}
    </span>
  );
}
