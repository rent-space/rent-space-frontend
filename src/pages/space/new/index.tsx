import { Form } from "@/components/Form";
import FormTitle from "@/components/Form/FormTitle";
import FormSection from "@/components/Form/FormSection";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/Input/TextArea";
import { useState } from "react";
import styles from "./styles.module.css";
import { CurrencyInput } from "@/components/Input/CurrencyInput";
import { PiHouseLight } from "react-icons/pi";
import { BsTelephoneFill } from "react-icons/bs";
import { ImageInput } from "@/components/Input/ImageInput";

export default function SpaceNew() {
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log("oi");
  };

  return (
    <Form
      name="Espaço"
      onSubmit={handleSubmit}
      action="/spaces"
      title="Cadastro de Espaço"
      subtitle="Adicione abaixo as informações que serão exibidas sobre o seu espaço"
    >
      <FormSection title="Sobre o local">
        <Input
          label="Título do anúncio"
          placeholder="Insira o título do local"
          type="text"
          required
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
          <CurrencyInput label="Valor por hora" required />
        </div>
      </FormSection>
      <FormSection title="Mídias do local" rowSpan={2}>
        <ImageInput name="images" />
      </FormSection>
      <FormSection title="Endereço do local">
        <div className={styles.inline}>
          <Input
            label="CEP"
            type="number"
            required={true}
            mask="99999-999"
            placeholder="_____-___"
            icon={PiHouseLight}
          />
          <Input label="Número" type="number" required />
        </div>
        <Input label="Cidade" placeholder="Insira a cidade" required />
        <div className={styles.inline}>
          <Input label="Rua" placeholder="Insira a rua" required />
        </div>
        <div className={styles.inline}>
          <Input label="Bairro" placeholder="Insira o bairro" required />
          <Input label="Complemento" placeholder="Insira o complemento" />
        </div>
      </FormSection>
    </Form>
  );
}
