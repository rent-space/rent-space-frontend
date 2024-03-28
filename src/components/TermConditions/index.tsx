import Link from 'next/link';
import styles from './styles.module.css';

export function TermCondition() {
    return (
        <div className={styles.container}>
            <label className={styles.checkboxLabel}>

                <span>Li e aceito os <Link href="" className={styles.link}>termos e condições</Link></span>
                <input type="checkbox" className={styles.checkboxInput} name="termos-e-condicoes"/>
                
            </label>
        </div>
    )
}
