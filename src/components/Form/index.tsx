import { useRouter } from "next/router";
import { Button } from "../Button";
import { Footer } from "../Footer";
import styles from "./style.module.css";
import { Header } from "../Header";
import FormTitle from "./FormTitle";

interface Props {
  name: string;
  onSubmit: (event: React.FormEvent) => void;
  children?: React.ReactNode;
  title: string;
  subtitle: string;
  loading: boolean;
}

export function Form(props: Props) {
  const { name, children, onSubmit, title, subtitle, loading } = props;

  const router = useRouter();

  const handleBack = () => {
    router.push("/home");
  };

  return (
    <>
      <Header justify="center" />
      <form id={name} className={styles.form} onSubmit={onSubmit}>
        <FormTitle title={title} subtitle={subtitle} />
        <div className={styles.formContent}>{children}</div>

        <Footer justify="right" separator>
          <Button
            variant="secondary"
            size="small"
            onClick={handleBack}
            type="button"
          >
            Voltar
          </Button>
          <Button
            variant="primary"
            size="small"
            type="submit"
            form={name}
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </Footer>
      </form>
    </>
  );
}
