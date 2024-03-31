import { InputHTMLAttributes } from "react";
import styles from "./styles.module.css";
import { IconType } from "react-icons";
import InputMask from "react-input-mask";
import { Text } from "../Text";

type Input = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: IconType;
  iconSize?: number;
  mask?: string;
};

export function Input(props: Input) {
  const {
    label,
    icon: Icon,
    iconSize,
    type,
    required,
    placeholder,
    mask,
  } = props;

  return (
    <div className={styles.content}>
      <Text variant="label" tone="secondary">
        {label}
        {required && " *"}
      </Text>

      {mask ? (
        <InputMask
          mask={mask}
          placeholder={placeholder}
          className={styles.input}
        />
      ) : (
        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      )}

      {Icon && (
        <div>
          <span className={styles.icon}>
            <Icon size={iconSize ? iconSize : 24} />
          </span>
        </div>
      )}
    </div>
  );
}
