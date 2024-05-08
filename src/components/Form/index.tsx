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
  isCreating: boolean;
}

const messages = {
  save: ["Salvar", "Salvando..."],
  create: ["Cadastrar", "Cadastrando..."],
};

export function Form(props: Props) {
  const { name, children, onSubmit, title, subtitle, loading, isCreating } =
    props;

  const router = useRouter();

  const handleBack = () => {
    router.push("/home");
  };

  const confirmButtonMessage = isCreating ? messages.create : messages.save;

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
            {loading ? confirmButtonMessage[1] : confirmButtonMessage[0]}
          </Button>
        </Footer>
      </form>
    </>
  );
}
