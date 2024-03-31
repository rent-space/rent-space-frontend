import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Form } from "@/components/Form";
import FormTitle from "@/components/Form/FormTitle";
import FormSection from "@/components/Form/FormSection";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import { useState } from "react";
import styles from "./styles.module.css";
import { CurrencyInput } from "@/components/Input/CurrencyInput";
import { PiHouseLight } from "react-icons/pi";
import { BsTelephoneFill } from "react-icons/bs";

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
            <CurrencyInput label="Valor por hora" required={true} />
          </div>
        </FormSection>
        <FormSection title="Endereço do local">
          <Input
            label="CEP"
            type="number"
            required={true}
            mask="99999-999"
            placeholder="_____-___"
            icon={PiHouseLight}
          />
          <Input label="Rua" placeholder="Insira a rua" required={true} />
          <div className={styles.inline}>
            <Input
              label="Bairro"
              placeholder="Insira o bairro"
              required={true}
            />
            <Input
              label="Cidade"
              placeholder="Insira a cidade"
              required={true}
            />
          </div>
          <div className={styles.inline}>
            <Input label="Complemento" placeholder="Insira o complemento" />
            <Input
              label="Número"
              type="tel"
              mask="(99) 9 9999-9999"
              placeholder="(__) _ ____-____"
              required={true}
              icon={BsTelephoneFill}
              iconSize={20}
            />
          </div>
        </FormSection>
      </Form>
      <Footer></Footer>
    </>
  );
}
