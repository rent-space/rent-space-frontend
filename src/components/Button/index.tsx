import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary";
  size: "small" | "large";
};
export function Button(props: ButtonProps) {
  const { variant, size, disabled, children, onClick, type, form } = props;

  return (
    <button
      type={type}
      form={form}
      data-size={size}
      data-variant={variant}
      data-disabled={disabled}
      className={styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
