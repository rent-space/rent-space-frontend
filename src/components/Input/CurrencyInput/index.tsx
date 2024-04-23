import ReactCurrencyInput from "react-currency-input-field";
import styles from "../styles.module.css";
import { Text } from "@/components/Text";
import { useForm } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  required?: boolean;
  setValue?: (value: any) => void;
}

export function CurrencyInput(props: Props) {
  const { label, required, name, setValue } = props;

  const { register } = useForm();

  return (
    <div className={styles.content}>
      <Text size="label" color="gray">
        {label}
        {required && " *"}
      </Text>
      <ReactCurrencyInput
        {...register(name)}
        id={label}
        placeholder="R$ 0,00"
        decimalScale={2}
        decimalsLimit={2}
        className={styles.input}
        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
        onChange={(e) => setValue && setValue(e.target.value)}
      />
    </div>
  );
}
