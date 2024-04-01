import { Button } from '../Button';
import styles from './styles.module.css';

type DetailsCardProps = {
    name?: string
    email?: string
    photo?: React.ReactNode
}

export function DetailsCard({name, email, photo, ...props}: DetailsCardProps) {
    return (
        <div className={styles.container}>
            <span className={styles.topTitle}> Disponibilizado por: </span>
            <div className={styles.userContainer}>
                <div className={styles.userPhoto}>{photo}</div>
                <div className={styles.userDetails}> 
                    <span className={styles.userName}>{name}</span>
                    <span className={styles.userEmail}>{email}</span>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <Button size='small' variant='primary'>Ligar</Button>
                <Button size='small' variant='secondary'>Acessar site</Button>
            </div>
        </div>
    )
}