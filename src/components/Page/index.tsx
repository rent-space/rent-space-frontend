import { Header } from "../Header";
import styles from "./style.module.css";

interface Props {
  userIsLoggedIn: boolean;
  children?: React.ReactNode;
}

export function Page(props: Props) {
  const { userIsLoggedIn, children } = props;

  return (
    <>
      <Header userLoggedIn={userIsLoggedIn} />
      <div className={styles.pageContent}>{children}</div>
    </>
  );
}
