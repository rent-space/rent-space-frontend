import { HTMLInputTypeAttribute } from "react";
import styles from "./styles.module.css";
import { IconType } from "react-icons";
import InputMask from "react-input-mask";
import { Text } from "../Text";

type InputComponentProps = {
  name: string;
  icon?: IconType;
  iconSize?: number;
  iconOnClick?: () => void;
  mask?: string;
  setValue?: (values: any) => void;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
};

type InputProps = InputComponentProps & {
  label?: string;
  icon?: IconType;
  iconSize?: number;
};

function InputComponent(props: InputComponentProps) {
  const {
    name,
    type = "text",
    required,
    placeholder,
    mask,
    setValue,
    options = [],
    min,
    max,
  } = props;

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
      ) : type === "select" ? (
        <select
          className={styles.inputSelect}
          onChange={(event) => setValue && setValue(event.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          className={styles.input}
          type={type}
          placeholder={placeholder}
          required={required}
          onChange={(event) => setValue && setValue(event.target.value)}
          min={min}
          max={max}
        />
      )}
    </>
  );
}

export function Input(props: InputProps) {
  const { label, icon: Icon, iconSize, iconOnClick, required } = props;

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
            <Icon size={iconSize ? iconSize : 24} onClick={iconOnClick} />
          </span>
        </div>
      )}
    </div>
  );
}
