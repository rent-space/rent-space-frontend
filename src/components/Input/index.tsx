import { HTMLInputTypeAttribute } from "react";
import styles from "./styles.module.css";
import { IconType } from "react-icons";
import InputMask from "react-input-mask";
import { Text } from "../Text";

type InputComponentProps = {
  name: string;
  icon?: IconType;
  iconSize?: number;
  mask?: string;
  setValue?: (values: any) => void;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  placeholder?: string;
};

type InputProps = InputComponentProps & {
  label?: string;
  icon?: IconType;
  iconSize?: number;
};

function InputComponent(props: InputComponentProps) {
  const { name, type = "text", required, placeholder, mask, setValue } = props;

  return (
    <>
      {mask ? (
        <InputMask
          name={name}
          mask={mask}
          placeholder={placeholder}
          className={styles.input}
          onChange={(event) => setValue && setValue(event.target.value)}
          required={required}
        />
      ) : (
        <input
          name={name}
          className={styles.input}
          type={type}
          placeholder={placeholder}
          required={required}
          onChange={(event) => setValue && setValue(event.target.value)}
        />
      )}
    </>
  );
}

export function Input(props: InputProps) {
  const { label, icon: Icon, iconSize, required } = props;

  return (
    <div className={styles.content}>
      <Text size="label" color="gray">
        {label}
        {required && " *"}
      </Text>

      <InputComponent {...props} />

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
