import Image from 'next/image';
import { DetailsCard } from '../DetailsCard';
import styles from './styles.module.css';
import detailsPrincipal from "@/assets/detailsTop.svg";
import { Button } from '../Button';


type DetailsSpaceProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    basicInfo?: string[];
    address?: string
    servicesAvailable?: string[];
}


export function DetailsSpace({title, subtitle, children, basicInfo, servicesAvailable, address}: DetailsSpaceProps) {
    return (
        <main className={styles.container}>
            <div className={styles.imageBox}>
                <div className={styles.topImage}>
                    <Image className={styles.topImage} src={detailsPrincipal} alt="Imagem principal" />
                </div>
                <div className={styles.bottomImage}>
                    <div className={styles.leftImage}>
                        <Image className={styles.sided} src={detailsPrincipal} alt="Imagem principal" />
                        <Image className={styles.sided} src={detailsPrincipal} alt="Imagem principal" />
                    </div>
                    <div className={styles.rightImage}>
                        <Image className={styles.sided} src={detailsPrincipal} alt="Imagem principal" />
                        <button className={styles.viewMore}>
                            Ver mais...
                        </button>
                    </div>
                </div>
                
            </div> 
            <div className={styles.detailsBox}>

                <div className={styles.titleBox}>
                    <span className={styles.title}>
                        {title}
                    </span>
                </div>

                <p className={styles.subtitle}> 
                    {subtitle}
                </p>

                <div className={styles.infoDetails}>

                    <div className={styles.textBox}>
                        <div className={styles.subinfoTitle}>
                            <span>Informações básicas</span> 
                            <ul>
                                {servicesAvailable && (
                                    <>
                                        {servicesAvailable.map((item,index) => (
                                            <li className={styles.servicesAvailable} key={index}>{item}</li>
                                        ))}
                                    </>) 
                                }
                            </ul>
                        </div>
                        
                        <div className={styles.subinfoTitle}>
                            <span>Endereço</span>
                            <p>{address}</p>
                        </div>
                        <div className={styles.subinfoTitle}>
                            <span>Serviços disponilizados</span>
                            <ul>
                                {basicInfo && (
                                    <>
                                        {basicInfo.map((item,index) => (
                                            <li className={styles.basicInfo} key={index}>{item}</li>
                                        ))}
                                    </>) 
                                }
                            </ul>
                        </div>
                    </div>

                    <div className={styles.detailsCardBox}>
                        {children}
                    </div>
                    
                </div>
                <div className={styles.buttonContent}>
                <Button variant='primary' size='large'>Contratar Espaço</Button>
                </div>
                
            </div>

        </main>
    )
}