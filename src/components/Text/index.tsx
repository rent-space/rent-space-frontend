import styles from "./style.module.css";

interface Props {
  variant: "label" | "body" | "section" | "subtitle" | "title1" | "title2";
  tone: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Text(props: Props) {
  const { variant, children, tone, onClick } = props;

  return (
    <span
      data-variant={variant}
      data-tone={tone}
      className={styles.text}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
