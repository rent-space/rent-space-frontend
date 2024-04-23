import { ChangeEvent, InputHTMLAttributes } from "react";
import styles from "./styles.module.css";
import { Text } from "../../Text";
import { useForm } from "react-hook-form";

type Input = InputHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export function TextArea(props: Input) {
  const { name, label, required, placeholder, value, onChange } = props;

  return (
    <div className={styles.content}>
      <div className={styles.label}>
        <Text size="label" color="gray">
          {label}
          {required && " *"}
        </Text>
        <Text size="label" color="gray">
          {value.length}/120
        </Text>
      </div>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={styles.textarea}
        placeholder={placeholder}
        maxLength={120}
        rows={3}
      />
    </div>
  );
}
