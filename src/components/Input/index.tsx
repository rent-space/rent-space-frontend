import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import styles from "./styles.module.css";
import { IconType } from "react-icons";
import InputMask from "react-input-mask";
import { Text } from "../Text";

type Input = {
  name: string;
  label?: string;
  icon?: IconType;
  iconSize?: number;
  mask?: string;
  form?: [any, Dispatch<SetStateAction<any>>];
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  placeholder?: string;
};

export function Input(props: Input) {
  const {
    name,
    label,
    icon: Icon,
    iconSize,
    type = "text",
    required,
    placeholder,
    mask,
    form,
  } = props;

  // const [formValues, setFormValues] = form;

  return (
    <div className={styles.content}>
      <Text size="label" color="gray">
        {label}
        {required && " *"}
      </Text>

      {mask ? (
        <InputMask
          name={name}
          mask={mask}
          placeholder={placeholder}
          className={styles.input}
        />
      ) : (
        <input
          name={name}
          className={styles.input}
          type={type}
          placeholder={placeholder}
          required={required}
          // onChange={(event) =>
          //   setFormValues({ formValues, ...{ name: event.target.value } })
          // }
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
