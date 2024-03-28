import { InputHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.css';
import { IconType } from 'react-icons';
type NameInput = InputHTMLAttributes<HTMLInputElement> & {
    title?: string
    icon?: IconType
}
export function NameInput({title,icon: Icon,...props}: NameInput) {
    return (
        <>
        <div className={styles.content}>
            <span className={styles.title}>{title}</span>
            <input className={styles.input} {...props}/>
            {Icon && (
            <div className={styles.iconContent}>
                <span className={styles.icon}>
                    <Icon/>
                </span>
            </div>)}
        </div>
        </>
    )
}