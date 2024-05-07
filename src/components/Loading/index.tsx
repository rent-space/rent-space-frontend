import styles from './styles.module.css';

interface LoadingProps {
  loadingLabel: string;
  color?: 'orange' | 'white'
}

export default function Loading({ loadingLabel, color = 'orange' }: LoadingProps) {
  return (
    <section className={`${styles.loadingContainer} ${color == 'white' && styles.white}`}>
      <div className={styles['col-3']}>
        <div className={`${styles.snippet} ${color == 'white' && styles.white}`} data-title="dot-flashing">
          <div className={`${styles.stage} ${color == 'white' && styles.white}`}>
            <div className={`${styles['dot-flashing']} ${color == 'white' && styles.white}`}></div>
          </div>
        </div>
      </div>

      <span className={`${styles.loadingLabel} ${color == 'white' && styles.white}`}>{loadingLabel}</span>
    </section>
  )
}