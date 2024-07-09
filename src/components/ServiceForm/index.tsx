import type { Service, ServicePayload, ServiceForm } from "@/utils/types";
import { Form } from "@/components/Form";
import FormSection from "../Form/FormSection";
import { Input } from "@/components/Input";
import { useState } from "react";
import { TextArea } from "../Input/TextArea";
import Inline from "../Inline";
import { CurrencyInput } from "../Input/CurrencyInput";
import { ImageInput } from "../Input/ImageInput";
import { PiHouseLight } from "react-icons/pi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getBase64, removeCurrencySymbolAndParse } from "@/utils/utils";
import { toast } from "react-toastify";

interface FormProps {
  service?: Service;
  handleSubmit: (service: ServicePayload, id?: number) => Promise<any>;
}

export default function ServiceForm(props: FormProps) {
  const { handleSubmit } = props;

  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const { data } = useSession();

  const [title, setTitle] = useState<ServiceForm["title"]>("");
  const [description, setDescription] =
    useState<ServiceForm["description"]>("");
  const [nature, setNature] = useState<ServiceForm["nature"]>("");
  const [quantityOfEmployees, setQuantityOfEmployees] =
    useState<ServiceForm["quantityOfEmployees"]>(0);
  const [pricePerHour, setPricePerHour] =
    useState<ServiceForm["pricePerHour"]>("");
  const [images, setImages] = useState<ServiceForm["images"]>([]);
  const [zipCode, setZipCode] = useState<ServiceForm["zipCode"]>();
  const [city, setCity] = useState<ServiceForm["city"]>("");
  const [address, setAddress] = useState<ServiceForm["address"]>("");
  const [neighborhood, setNeighborhood] =
    useState<ServiceForm["neighborhood"]>("");
  const [complement, setComplement] = useState<ServiceForm["complement"]>("");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    const mediaPromises = images.map(async (image) => {
      return await getBase64(image);
    });

    Promise.all(mediaPromises)
      .then(async (media: string[]) => {
        const servicePaylod: ServicePayload = {
          title,
          description,
          media,
          address,
          neighborhood,
          city,
          pricePerHour: removeCurrencySymbolAndParse(pricePerHour),
          serviceNature: nature,
          peopleInvolved: quantityOfEmployees,
          ownerId: parseInt(data?.user.id ?? ""),
          placesIdsRelated: [],
        };
        handleSubmit(servicePaylod).then(() => setLoading(false));
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error processing images:", error);
      });
  };

  return (
    <Form
      name="Serviço"
      title="Cadastro de Serviço"
      subtitle="Adicione abaixo as informações que serão exibidas sobre o seu serviço oferecido"
      loading={loading}
      isCreating={true}
      onSubmit={onSubmit}
    >
      <FormSection title="Sobre o serviço">
        <Input
          name="title"
          value={title}
          label="Título do anúncio"
          placeholder="Insira o título do serviço"
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
        <Input
          name="nature"
          value={nature}
          label="Natureza do serviço"
          placeholder="Insira a natureza do serviço (ex: garçom, bar, etc.)"
          type="text"
          required
          setValue={setNature}
        />
        <Inline>
          <Input
            name="quantityOfEmployees"
            value={quantityOfEmployees}
            label="Quantidade de empregados"
            placeholder="0"
            type="number"
            min={0}
            setValue={setQuantityOfEmployees}
          />
          <CurrencyInput
            name="pricePerHour"
            value={pricePerHour}
            label="Valor por hora"
            required
            setValue={setPricePerHour}
          />
        </Inline>
      </FormSection>
      <FormSection title="Mídias do serviço" rowSpan={2}>
        <ImageInput name="media" images={images} setImages={setImages} />
      </FormSection>
      <FormSection title="Endereço do serviço">
        <div style={{ width: "calc(50% - 0.5rem)" }}>
          <Input
            name="zipCode"
            value={zipCode}
            label="CEP"
            type="number"
            mask="99999-999"
            placeholder="_____-___"
            icon={PiHouseLight}
            setValue={setZipCode}
          />
        </div>
        <Inline>
          <Input
            name="city"
            label="Cidade"
            placeholder="Insira a cidade"
            value={city}
            setValue={setCity}
          />
          <Input
            name="neighborhood"
            label="Bairro"
            placeholder="Insira o bairro"
            value={neighborhood}
            setValue={setNeighborhood}
          />
        </Inline>
        <Inline>
          <Input
            name="address"
            label="Rua"
            placeholder="Insira a rua"
            value={address}
            setValue={setAddress}
          />
          <Input
            name="complement"
            label="Complemento"
            placeholder="Insira o complemento (ex: apto, bloco, etc.)"
            value={complement}
            setValue={setComplement}
          />
        </Inline>
      </FormSection>
    </Form>
  );
}
