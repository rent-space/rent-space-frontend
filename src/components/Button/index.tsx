import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary";
  onClick?: () => void;
};
export function Button(props: ButtonProps) {
  const { disabled, variant, children } = props;

  return (
    <button
      data-variant={variant}
      data-disabled={disabled}
      className={styles.button}
    >
      {children}
    </button>
  );
}
