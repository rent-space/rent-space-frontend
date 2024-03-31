import { useRouter } from "next/router";
import { Button } from "../Button";
import { Footer } from "../Footer";
import styles from "./style.module.css";
import { Header } from "../Header";

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
    router.push("/home");
  };

  return (
    <>
      <Header justify="center" />
      <form
        id={name}
        action={action}
        className={styles.form}
        onSubmit={onSubmit}
      >
        {children}
        <Footer justify="right" separator>
          <Button
            variant="secondary"
            size="small"
            onClick={handleBack}
            type="button"
          >
            Voltar
          </Button>
          <Button variant="primary" size="small" type="submit" form={name}>
            Cadastrar
          </Button>
        </Footer>
      </form>
    </>
  );
}
