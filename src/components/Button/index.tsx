import { ButtonHTMLAttributes } from "react"
import styles from './styles.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    secondary?: boolean;
    aditionalStyles?: any;
    onClick?: () => void
}

export function Button({ secondary = false, disabled = false, aditionalStyles, ...props}: ButtonProps) {
    return (
        <button
        className={`${styles.button} ${disabled && styles.disabled} ${secondary && styles.secondary} ${aditionalStyles} `} {...props}></button>
    )
}