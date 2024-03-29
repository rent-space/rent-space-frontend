import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Form } from "@/components/Form";
import FormTitle from "@/components/Form/FormTitle";
import FormSection from "@/components/Form/FormSection";
import { Input } from "@/components/Input";

export default function SpaceNew() {
  return (
    <>
      <Header justify="center" />
      <Form>
        <FormTitle
          title="Cadastro de Espaço"
          subtitle="Adicione abaixo as informações que serão exibidas sobre o seu espaço"
        />
        <FormSection title="Sobre o local">
          <Input
            label="Título do anúncio"
            placeholder="Insira o título do local"
            required={true}
          ></Input>
        </FormSection>

        <section></section>
      </Form>
      <Footer></Footer>
    </>
  );
}
