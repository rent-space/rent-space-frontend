import { Header } from "@/components/Header";
import { Page } from "@/components/Page";
import styles from './style.module.css';
import { DetailsCard } from "../../../components/DetailsCard";
export default function DetailsSpace() {
  return (
    <>
      <Header justify="center" />
      <Page>
        <main className={styles.container}>
            <div className={styles.box}>
              aqui vai ser as imagens
            </div>
            <div className={styles.detailsBox}>
                <div className={styles.titleBox}>
                    <span className={styles.title}>
                        Espaço Verde 
                    </span>
                </div>

                <p className={styles.subtitle}> 
                Um lugar muito agradável e espaçoso para 
                quem gosta de ar livre para seus eventos
                onde você pode aproveitar da natureza para
                criar um ambiente perfeito para todos os 
                seus convidados. Disponibilizamos diversos serviços
                que podem ser contratados juntamente com nosso local,
                venha fazer sua festa conosco.</p>
                <div className={styles.infoDetails}>
                    <div className={styles.subinfoTitle}>
                        <span>Informações básicas</span> 
                    </div>
                    
                    <div className={styles.subinfoTitle}>
                        <span>Endereço</span>
                    </div>
                    <div className={styles.subinfoTitle}>
                        <span>Serviços disponilizados</span>
                    </div>
                    <DetailsCard/>
                </div>
                
                
            </div>

        </main>
        
      </Page>
    </>
  );
}
