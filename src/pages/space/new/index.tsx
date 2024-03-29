import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Form } from "@/components/Form";
import FormTitle from "@/components/Form/FormTitle";
import FormSection from "@/components/Form/FormSection";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import { useState } from "react";
import styles from "./styles.module.css";

export default function SpaceNew() {
  const [description, setDescription] = useState("");

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
            type="text"
            required={true}
          />
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="textarea"
            label="Descrição"
            placeholder="Adicione a descrição"
          />
          <div className={styles.inline}>
            <Input label="Capacidade máxima" placeholder="0" type="number" />
            <Input
              label="Valor por hora"
              placeholder="0"
              type="number"
              required={true}
            />
          </div>
        </FormSection>

        <section></section>
      </Form>
      <Footer></Footer>
    </>
  );
}
