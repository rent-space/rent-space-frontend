import { Header } from "@/components/Header";
import { Page } from "@/components/Page";
import { DetailsSpace } from "@/components/DetailsSpace";
import { DetailsCard } from "@/components/DetailsCard";

export default function DetailsPageSpace() {
  const teste = ['teste','teste1','teste2'];
  return (
    <>
      <Header justify="center" />
      <Page>
        <DetailsSpace
          title='Espaco Verde'
          subtitle="ESPAÇO VERDE ESPAÇO VERDE ESPAÇO VERDE ESPAÇO VERDE ESPAÇO VERDE ESPAÇO VERDE"
          basicInfo={teste}
          servicesAvailable={teste}
        >
           <DetailsCard
           name="nome exemplo"
           email="email@email.com"/>
        </DetailsSpace>
      </Page>
    </>
  );
}
