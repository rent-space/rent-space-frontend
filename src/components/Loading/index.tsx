import styles from './styles.module.css';

export default function Loading({ loadingLabel }: { loadingLabel: string}) {
  return (
    <section className={styles.loadingContainer}>
      <div className={styles['col-3']}>
        <div className={styles.snippet} data-title="dot-flashing">
          <div className={styles.stage}>
            <div className={styles['dot-flashing']}></div>
          </div>
        </div>
      </div>

      <span className={styles.loadingLabel}>{loadingLabel}</span>
    </section>
  )
}