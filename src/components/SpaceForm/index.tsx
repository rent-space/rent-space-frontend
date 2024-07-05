import { Form } from "@/components/Form";
import FormSection from "@/components/Form/FormSection";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/Input/TextArea";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { CurrencyInput } from "@/components/Input/CurrencyInput";
import { PiHouseLight } from "react-icons/pi";
import { ImageInput } from "@/components/Input/ImageInput";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import {
  getBase64,
  removeCurrencySymbolAndParse,
  stringToFile,
  zipCodeToInt,
} from "@/utils/utils";
import { toast } from "react-toastify";
import { SpaceLoading } from "../SpaceLoading";
import { Space, SpacePayload } from "@/utils/types";

interface Props {
  space: Space | undefined;
  handleSubmit: (space: SpacePayload, id?: number) => Promise<any>;
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

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [address, setAddress] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [pricePerHour, setPricePerHour] = useState<string>("");
  const [maximumCapacity, setMaximumCapacity] = useState<number>(0);
  const [complement, setComplement] = useState<string>("");
  const [zipCode, setZipCode] = useState<number | undefined>();

  const [loading, setLoading] = useState(false);

  const medias = useMemo(() => stringToFile(space?.media), [space?.media]);

  useEffect(() => {
    space?.title && setTitle(space?.title);
    space?.description && setDescription(space?.description);
    medias && setImages(medias);
    space?.address && setAddress(space?.address);
    space?.neighborhood && setNeighborhood(space?.neighborhood);
    space?.city && setCity(space?.city);
    space?.pricePerHour && setPricePerHour(space?.pricePerHour.toString());
    space?.maximumCapacity && setMaximumCapacity(space?.maximumCapacity);
    space?.complement && setComplement(space?.complement);
    setZipCode(zipCodeToInt(space?.zipCode));
  }, [medias, space]);

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
        const spacePaylod: SpacePayload = {
          title,
          description,
          media,
          address,
          neighborhood,
          city,
          pricePerHour: removeCurrencySymbolAndParse(pricePerHour),
          maximumCapacity,
          complement,
          zipCode: zipCode?.toString() ?? "",
          ownerId: parseInt(data.user.id),
        };
        handleSubmit(spacePaylod, space?.id).then(() => setLoading(false));
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error processing images:", error);
      });
  };

  if (!space) {
    return <SpaceLoading />;
  }

  return (
    <Form
      name="Espaço"
      onSubmit={onSubmit}
      title="Cadastro de Espaço"
      subtitle="Adicione abaixo as informações que serão exibidas sobre o seu espaço"
      loading={loading}
      isCreating={!space.id}
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
