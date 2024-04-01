import { DetailsCard } from '../DetailsCard';
import styles from './styles.module.css';

type DetailsSpaceProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    basicInfo?: string[];
    servicesAvailable?: string[];
}


export function DetailsSpace({title, subtitle, children, basicInfo, servicesAvailable, ...props}: DetailsSpaceProps) {
    return (
        <>
        <main className={styles.container}>
            <div className={styles.box}>
              aqui vai ser as imagens
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
                    <div>
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
                        <p>descrição do endereço</p>
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
            </div>
        </main>
        </>
    )
}