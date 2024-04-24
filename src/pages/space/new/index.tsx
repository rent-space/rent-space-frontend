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
import { createSpace } from "@/services/api/space";
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

export default function SpaceNew() {
  const { data } = useSession();
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [address, setAddress] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [pricePerHour, setPricePerHour] = useState<number>(0);
  const [maximumCapacity, setMaximumCapacity] = useState<number>(0);
  const [complement, setComplement] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");

  console.log(pricePerHour);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    if (!data?.user?.email) {
      console.error("User not logged in");
      return;
    }

    const mediaPromises = images.map(async (image) => {
      return await getBase64(image);
    });

    Promise.all(mediaPromises)
      .then(async (media: string[]) => {
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
          ownerId: parseInt(data.user.id),
        };
        createSpace(space).then((response) => {
          setLoading(false);
          response && router.push(`/space/${response.id}`);
        });
      })
      .catch((error) => {
        console.error("Error processing images:", error);
        setLoading(false);
      });
  };

  return (
    <Form
      name="Espaço"
      onSubmit={onSubmit}
      title="Cadastro de Espaço"
      subtitle="Adicione abaixo as informações que serão exibidas sobre o seu espaço"
      loading={loading}
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
            required
            mask="99999-999"
            placeholder="_____-___"
            icon={PiHouseLight}
            setValue={setZipCode}
          />
          <Input name="telephone" label="Número" type="number" />
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
