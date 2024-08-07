import { getCookie, setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GrLanguage } from "react-icons/gr";
import styles from "./style.module.css";

export function LanguageSelector() {
  const router = useRouter();
  const t = useTranslations("common");

  const [value, setValue] = useState<string>();

  useEffect(() => {
    const language = getCookie("language");
    setValue(language);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    setCookie("language", language);
    router.reload();
  };

  return (
    <div className={styles.selectContainer}>
      <GrLanguage />

      <select value={value} onChange={handleChange}>
        <option value="pt">{t("portuguese")}</option>
        <option value="it">{t("italian")}</option>
      </select>
    </div>
  );
}
