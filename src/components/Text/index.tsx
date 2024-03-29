import styles from "./style.module.css";

interface Props {
  variant: "label" | "body" | "section" | "subtitle" | "title1" | "title2";
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
