import ReactCurrencyInput from "react-currency-input-field";
import styles from "../styles.module.css";
import { Text } from "@/components/Text";

interface Props {
  name: string;
  label: string;
  required?: boolean;
  value: string;
  setValue?: (value: any) => void;
}

export function CurrencyInput(props: Props) {
  const { label, required, name, value, setValue } = props;

  return (
    <div className={styles.content}>
      <Text size="label" color="gray">
        {label}
        {required && " *"}
      </Text>
      <ReactCurrencyInput
        name={name}
        id={label}
        placeholder="R$ 0,00"
        defaultValue={0}
        decimalScale={2}
        decimalsLimit={2}
        className={styles.input}
        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
        value={value}
        onValueChange={(v) => setValue && setValue(v)}
        required={required}
      />
    </div>
  );
}
