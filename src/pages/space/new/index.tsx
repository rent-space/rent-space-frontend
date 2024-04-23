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
import { SpacePayload, User } from "@/utils/types";
import { getBase64 } from "@/utils/utils";

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
  const { data } = useSession();
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [pricePerHour, setPricePerHour] = useState(0);
  const [maximumCapacity, setMaximumCapacity] = useState(0);
  const [complement, setComplement] = useState("");
  const [zipCode, setZipCode] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    if (!data?.user?.email) {
      console.error("User not logged in");
      return;
    }

    const mediaPromises = images.map(async (image) => {
      return await getBase64(image);
    });

    Promise.all(mediaPromises)
      .then((media: string[]) => {
        const space: SpacePayload = {
          title,
          description,
          media,
          address,
          neighborhood,
          city,
          pricePerHour,
          maximumCapacity,
          complement,
          zipCode,
          ownerId: (data?.user as User).id as number,
        };
        console.log(space);
      })
      .catch((error) => {
        console.error("Error processing images:", error);
      });

    event.preventDefault();

    // await createSpace(space);
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
          setValue={setTitle}
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
            setValue={setMaximumCapacity}
          />
          <CurrencyInput
            name="pricePerHour"
            label="Valor por hora"
            required
            setValue={setPricePerHour}
          />
        </div>
      </FormSection>
      <FormSection title="Mídias do local" rowSpan={2}>
        <ImageInput name="media" images={images} setImages={setImages} />
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
            setValue={setZipCode}
          />
          <Input name="telephone" label="Número" type="number" required />
        </div>
        <Input
          name="city"
          label="Cidade"
          placeholder="Insira a cidade"
          required
          setValue={setCity}
        />
        <div className={styles.inline}>
          <Input
            name="address"
            label="Rua"
            placeholder="Insira a rua"
            required
            setValue={setAddress}
          />
        </div>
        <div className={styles.inline}>
          <Input
            name="neighborhood"
            label="Bairro"
            placeholder="Insira o bairro"
            required
            setValue={setNeighborhood}
          />
          <Input
            name="complement"
            label="Complemento"
            placeholder="Insira o complemento"
            setValue={setComplement}
          />
        </div>
      </FormSection>
    </Form>
  );
}
