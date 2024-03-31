import styles from "./style.module.css";

interface Props {
  children?: React.ReactNode;
  type?: "list" | "form";
}

export function Page(props: Props) {
  const { children, type = "list" } = props;

  return (
    <>
      <div className={styles.pageContent} data-type={type}>
        {children}
      </div>
    </>
  );
}
