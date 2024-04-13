import { Header } from "@/components/Header";
import { Page } from "@/components/Page";
import { DetailsSpace } from "@/components/DetailsSpace";
import { DetailsCard } from "@/components/DetailsCard";
import { Footer } from "@/components/Footer";

const space = {
  title: "Espaco Verde",
  description:
    "Um lugar muito agradável e espaçoso para quem gosta de ar livre para seus eventos onde você pode aproveitar da natureza para criar um ambiente perfeito para todos os seus convidados. Disponibilizamos diversos serviços que podem ser contratados juntamente com nosso local, venha fazer sua festa conosco.",
  address: "R. Afonso Campos, 304A",
  city: "Campina Grande",
  pricePerHour: 100,
  owner: {
    name: "Espaço Verde Recepções",
    profilePhoto: "",
    email: "espacoverde@gmail.com",
    telephone: "83988650907",
    webSite: "www.espacoverde.com.br",
  },
  maximumCapacity: 300,
  neighborhood: "Centro",
  complement: "",
  zipCode: 58400235,
};

export default function DetailsPageSpace() {
  return (
    <>
      <Header justify="center" navigateBackTo="/spaces" />
      <Page type="form">
        <DetailsSpace space={space}>
          <DetailsCard owner={space.owner} />
        </DetailsSpace>
      </Page>
      <Footer />
    </>
  );
}
