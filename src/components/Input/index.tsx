import { InputHTMLAttributes } from "react";
import styles from "./styles.module.css";
import { IconType } from "react-icons";
import { Text } from "../Text";

type Input = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: IconType;
};

export function Input({ label, icon: Icon, ...props }: Input) {
  return (
    <>
      <div className={styles.content}>
        <Text variant="label" tone="secondary">
          {label}
          {props.required && " *"}
        </Text>
        <input className={styles.input} {...props} />
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
