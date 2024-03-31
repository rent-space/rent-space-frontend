import { useRouter } from "next/router";
import { Button } from "../Button";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Separator } from "../Separator";
import styles from "./style.module.css";

interface Props {
  name: string;
  action: string;
  onSubmit: () => void;
  children?: React.ReactNode;
}

export function Form(props: Props) {
  const { name, children, onSubmit, action } = props;

  const router = useRouter();

  const handleBack = () => {
    router.push(action);
  };

  return (
    <>
      <form
        id={name}
        action={action}
        className={styles.form}
        onSubmit={onSubmit}
      >
        <Header justify="center" />
        {children}
        <Separator />
        <Footer justify="right">
          <Button
            variant="secondary"
            size="small"
            onClick={handleBack}
            type="button"
          >
            Voltar
          </Button>
          <Button variant="primary" size="small" type="submit" form={name}>
            Cadastrar {name}
          </Button>
        </Footer>
      </form>
    </>
  );
}
