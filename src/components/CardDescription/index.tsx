import Image from 'next/image';
import styles from './styles.module.css';
import { ButtonHTMLAttributes } from 'react';

type CardProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string,
    description: string,
    maxCapacity: number,
    pricePerHour: number,
    image: string,
    onClick: ()=>void
}

export function CardDescription({title, description, maxCapacity, pricePerHour, image,onClick, ...props}: CardProps) {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.imageContainer}>
                <Image src={image}  alt='Imagem do Espaço' width={175} height={225}></Image>
            </div>
            <div className={styles.descriptionSide}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
                <div className={styles.maxCapacity}>~{maxCapacity} Pessoas</div>
                <div className={styles.price}>R$ {pricePerHour}/h</div>
            </div>
        </div>
    )
}