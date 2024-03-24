import { HTMLAttributes } from 'react';
import styles from './styles.module.css';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hasMargin?: boolean,
  aditionalStyles?: any
}

export function Card({ hasMargin = true, aditionalStyles, ...props}: CardProps) {
  return (
    <div className={`${styles.content} ${hasMargin && styles.marginCard} ${aditionalStyles}`} {...props}>
    </div>
  )
}