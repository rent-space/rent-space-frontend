import { InputHTMLAttributes } from "react";
import styles from "./styles.module.css";
import { IconType } from "react-icons";
import { Text } from "../Text";

type Input = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: IconType;
};

export function Input(props: Input) {
  const { label, icon: Icon, type, required, placeholder } = props;

  return (
    <>
      <div className={styles.content}>
        <Text variant="label" tone="secondary">
          {label}
          {required && " *"}
        </Text>
        <input className={styles.input} type={type} placeholder={placeholder} />
        {Icon && (
          <div className={styles.iconContent}>
            <span className={styles.icon}>
              <Icon />
            </span>
          </div>
        )}
      </div>
    </>
  );
}
