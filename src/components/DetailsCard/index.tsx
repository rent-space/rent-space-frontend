import { Button } from "../Button";
import styles from "./styles.module.css";

type Owner = {
  name: string;
  profilePhoto: string;
  email: string;
  telephone: string;
  webSite: string;
};

interface Props {
  owner: Owner;
}

export function DetailsCard(props: Props) {
  const { owner } = props;
  const { name, email, telephone, profilePhoto, webSite } = owner;

  return (
    <div className={styles.container}>
      <span className={styles.topTitle}> Disponibilizado por: </span>
      <div className={styles.userContainer}>
        <img className={styles.userPhoto} src={profilePhoto} />
        <div className={styles.userDetails}>
          <span className={styles.userName}>{name}</span>
          <span className={styles.userEmail}>{email}</span>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button size="small" variant="secondary">
          Ligar
        </Button>
        <Button size="small" variant="secondary">
          Acessar site
        </Button>
      </div>
    </div>
  );
}
