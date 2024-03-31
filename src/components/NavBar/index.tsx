import { NavItem } from "./NavItem";
import styles from "./style.module.css";

export function NavBar() {
  return (
    <ul className={styles.navbar}>
      <NavItem name="Home" path="/home" />
      <NavItem name="Espaços" path="/spaces" />
      <NavItem name="Serviços" path="/services" />
    </ul>
  );
}
