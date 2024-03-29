import { ChangeEvent, InputHTMLAttributes } from "react";
import styles from "./styles.module.css";
import { Text } from "../Text";

type Input = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export function TextArea(props: Input) {
  const { label, required, placeholder, value, onChange } = props;

  return (
    <>
      <div className={styles.content}>
        <div className={styles.label}>
          <Text variant="label" tone="secondary">
            {label}
            {required && " *"}
          </Text>
          <Text variant="label" tone="secondary">
            {value.length}/120
          </Text>
        </div>
        <textarea
          value={value}
          onChange={onChange}
          className={styles.textarea}
          placeholder={placeholder}
          maxLength={120}
          rows={3}
        />
      </div>
    </>
  );
}
