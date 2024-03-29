import styles from "./style.module.css";

interface Props {
  children?: React.ReactNode;
}

export function Page(props: Props) {
  const { children } = props;

  return (
    <>
      <div className={styles.pageContent}>{children}</div>
    </>
  );
}
