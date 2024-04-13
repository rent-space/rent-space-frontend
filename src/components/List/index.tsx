import styles from "./style.module.css";

interface Props {
  children?: React.ReactNode;
}

export function List(props: Props) {
  const { children } = props;

  return (
    <>
      <div className={styles.form}>{children}</div>
    </>
  );
}
