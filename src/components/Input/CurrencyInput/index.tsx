import ReactCurrencyInput from "react-currency-input-field";
import styles from "../styles.module.css";
import { Text } from "@/components/Text";

interface Props {
  label: string;
  required?: boolean;
}

export function CurrencyInput(props: Props) {
  const { label, required } = props;

  return (
    <div className={styles.content}>
      <Text size="label" color="gray">
        {label}
        {required && " *"}
      </Text>
      <ReactCurrencyInput
        id={label}
        name={label}
        placeholder="R$ 0,00"
        decimalScale={2}
        decimalsLimit={2}
        className={styles.input}
        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
      />
    </div>
  );
}
