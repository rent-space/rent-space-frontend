import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Form } from "@/components/Form";
import FormTitle from "@/components/Form/FormTitle";

export default function SpaceNew() {
  return (
    <>
      <Header justify="center" />
      <Form>
        <FormTitle
          title="Cadastro de Espaço"
          subtitle="Adicione abaixo as informações que serão exibidas sobre o seu espaço"
        />

        <section></section>

        <section></section>
      </Form>
      <Footer></Footer>
    </>
  );
}
