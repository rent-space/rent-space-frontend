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
import { Space, SpacePayload, User } from "@/utils/types";
import { getBase64, stringToFile, zipCodeToInt } from "@/utils/utils";
import { toast } from "react-toastify";

interface Props {
  space: Space | undefined;
  handleSubmit: () => void;
}

export default function SpaceForm(props: Props) {
  const { space, handleSubmit } = props;

  const { data } = useSession();
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [title, setTitle] = useState<string>(space?.title ?? "");
  const [description, setDescription] = useState<string>(
    space?.description ?? ""
  );
  const [images, setImages] = useState<File[]>(stringToFile(space?.media));
  const [address, setAddress] = useState<string>(space?.address ?? "");
  const [neighborhood, setNeighborhood] = useState<string>(
    space?.neighborhood ?? ""
  );
  const [city, setCity] = useState<string>(space?.city ?? "");
  const [pricePerHour, setPricePerHour] = useState<number>(
    space?.pricePerHour ?? 0
  );
  const [maximumCapacity, setMaximumCapacity] = useState<number>(
    space?.maximumCapacity ?? 0
  );
  const [complement, setComplement] = useState<string>(space?.complement ?? "");
  const [zipCode, setZipCode] = useState<number | undefined>(
    zipCodeToInt(space?.zipCode)
  );

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
          zipCode: zipCode?.toString() ?? "",
          ownerId: parseInt(data.user.id),
        };
        handleSubmit();
        // createSpace(space).then((response) => {
        //   setLoading(false);
        //   response && router.push(`/space/${response.id}`);
        // });
      })
      .catch((error) => {
        toast.error("Error processing images:", error);
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
          value={title}
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
            value={maximumCapacity}
            label="Capacidade máxima"
            placeholder="0"
            type="number"
            setValue={setMaximumCapacity}
          />
          <CurrencyInput
            name="pricePerHour"
            value={pricePerHour}
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
            value={zipCode}
            label="CEP"
            type="number"
            required
            mask="99999-999"
            placeholder="_____-___"
            icon={PiHouseLight}
            setValue={setZipCode}
          />
        </div>
        <Input
          name="city"
          label="Cidade"
          placeholder="Insira a cidade"
          required
          value={city}
          setValue={setCity}
        />
        <div className={styles.inline}>
          <Input
            name="address"
            label="Rua"
            placeholder="Insira a rua"
            required
            value={address}
            setValue={setAddress}
          />
        </div>
        <div className={styles.inline}>
          <Input
            name="neighborhood"
            label="Bairro"
            placeholder="Insira o bairro"
            required
            value={neighborhood}
            setValue={setNeighborhood}
          />
          <Input
            name="complement"
            label="Complemento"
            placeholder="Insira o complemento"
            value={complement}
            setValue={setComplement}
          />
        </div>
      </FormSection>
    </Form>
  );
}
