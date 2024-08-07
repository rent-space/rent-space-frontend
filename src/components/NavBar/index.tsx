import { useTranslations } from "next-intl";
import { NavItem } from "./NavItem";
import styles from "./style.module.css";

export function NavBar() {
  const t = useTranslations("navbar");

  return (
    <ul className={styles.navbar}>
      <NavItem name={t("home")} path="/home" />
      <NavItem name={t("spaces")} path="/spaces" />
      <NavItem name={t("services")} path="/services" />
    </ul>
  );
}
