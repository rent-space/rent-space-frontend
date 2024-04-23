import styles from './styles.module.css';

type StatusValues = "pending" | "accepted" | "canceled"; 

interface StatusTagsProps {
  status: StatusValues,
  tagText: string
}

export default function StatusTag({ status, tagText }: StatusTagsProps) {
  return (
    <div className={`${styles.statusTag} ${styles[status]}`}>
      <span>{tagText}</span>
    </div>
  )
}