import { ButtonHTMLAttributes } from "react"
import styles from './styles.module.css'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    secundary?: boolean;
    disabled?: boolean;
}
export function Button({ secundary = false, disabled = false, ...props}: ButtonProps) {
    return (
        <button
        className={`${styles.button} ${disabled && styles.disabled} ${secundary && styles.secundary} `} {...props}></button>
    )
}