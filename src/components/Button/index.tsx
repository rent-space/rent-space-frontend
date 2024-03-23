import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary";
};
export function Button(props: ButtonProps) {
  const { disabled, variant, children, onClick } = props;

  return (
    <button
      data-variant={variant}
      data-disabled={disabled}
      className={styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
