import Link from 'next/link';
import styles from './styles.module.css';

export function TermCondition() {
    return (
        <div className={styles.container}>
            <span>Li e aceito os <Link href="" className={styles.link}> termos e condições</Link></span>
            <input type="checkbox" />
        </div>
        
    )
}