import { Form } from "@/components/Form";
import FormSection from "@/components/Form/FormSection";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/Input/TextArea";
import { useState } from "react";
import styles from "./styles.module.css";
import { CurrencyInput } from "@/components/Input/CurrencyInput";
import { PiHouseLight } from "react-icons/pi";
import { ImageInput } from "@/components/Input/ImageInput";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { createSpace } from "@/services/api/spaces";
import { SpacePayload } from "@/utils/types";

export interface SpaceForm {
  title: string;
  description: string;
  media: string[];
  address: string;
  neighborhood: string;
  city: string;
  pricePerHour: number;
  maximumCapacity: number;
  complement: string;
  zipCode: string;
}

const EMPTY_SPACE: SpaceForm = {
  title: "",
  description: "",
  media: [],
  address: "",
  neighborhood: "",
  city: "",
  pricePerHour: 0,
  maximumCapacity: 0,
  complement: "",
  zipCode: "",
};

export default function SpaceNew() {
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const form = useState<SpaceForm>(EMPTY_SPACE);

  const [description, setDescription] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    console.log(form);
    const space: SpacePayload = {
      title: "espaco1",
      description: "espaco descricao",
      media: [],
      address: "rua numero 2",
      neighborhood: "catole",
      city: "cg",
      pricePerHour: 3,
      maximumCapacity: 5,
      complement: "bloco e",
      zipCode: "43",
      ownerId: 152,
    };

    createSpace(space);
    // console.log(response);

    event.preventDefault();
  };

  return (
    <Form
      name="Espaço"
      onSubmit={onSubmit}
      action="/spaces"
      title="Cadastro de Espaço"
      subtitle="Adicione abaixo as informações que serão exibidas sobre o seu espaço"
    >
      <FormSection title="Sobre o local">
        <Input
          name="title"
          label="Título do anúncio"
          placeholder="Insira o título do local"
          type="text"
          required
        />
        <TextArea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="textarea"
          label="Descrição"
          placeholder="Adicione a descrição"
        />
        <div className={styles.inline}>
          <Input
            name="maximumCapacity"
            label="Capacidade máxima"
            placeholder="0"
            type="number"
          />
          <CurrencyInput name="pricePerHour" label="Valor por hora" required />
        </div>
      </FormSection>
      <FormSection title="Mídias do local" rowSpan={2}>
        <ImageInput name="media" />
      </FormSection>
      <FormSection title="Endereço do local">
        <div className={styles.inline}>
          <Input
            name="zipCode"
            label="CEP"
            type="number"
            required={true}
            mask="99999-999"
            placeholder="_____-___"
            icon={PiHouseLight}
          />
          <Input name="telephone" label="Número" type="number" required />
        </div>
        <Input
          name="city"
          label="Cidade"
          placeholder="Insira a cidade"
          required
        />
        <div className={styles.inline}>
          <Input
            name="address"
            label="Rua"
            placeholder="Insira a rua"
            required
          />
        </div>
        <div className={styles.inline}>
          <Input
            name="neighborhood"
            label="Bairro"
            placeholder="Insira o bairro"
            required
          />
          <Input
            name="complement"
            label="Complemento"
            placeholder="Insira o complemento"
          />
        </div>
      </FormSection>
    </Form>
  );
}
