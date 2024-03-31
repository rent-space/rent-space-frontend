import { InputHTMLAttributes } from "react";
import styles from "./styles.module.css";
import { IconType } from "react-icons";
import InputMask from "react-input-mask";
import { Text } from "../Text";

type Input = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: IconType;
  iconSize?: number;
};

export function Input(props: Input) {
  const { label, icon: Icon, iconSize, type, required, placeholder } = props;

  return (
    <div className={styles.content}>
      <Text variant="label" tone="secondary">
        {label}
        {required && " *"}
      </Text>

      {type === "tel" ? (
        <InputMask
          mask="(99) 9 9999-9999"
          placeholder="(__) _ ____-____"
          className={styles.input}
        />
      ) : (
        <input className={styles.input} type={type} placeholder={placeholder} />
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
