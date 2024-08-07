import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

import styles from "./IconAccountCircle.module.css";
import { useRouter } from "next/router";
import { GrLanguage } from "react-icons/gr";
import { FiLogOut, FiCalendar } from "react-icons/fi";
import { LanguageSelector } from "../LanguageSelector";
import { useTranslations } from "next-intl";

interface Props {
  onClick?: () => void;
}

export function IconAccountCircle(props: Props) {
  const session = useSession();
  const router = useRouter();
  const t = useTranslations("modal-user");

  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [showLanguagePopover, setShowLanguagePopover] =
    useState<boolean>(false);

  return (
    <div style={{ position: "relative", overflow: "visible" }}>
      <Image
        src={
          session && session.data?.user?.image
            ? session.data?.user?.image
            : "/account_circle.svg"
        }
        alt="Account Icon"
        className={styles.roundedImage}
        width={45}
        height={45}
        onClick={() => setShowPopover(!showPopover)}
      />
      {showPopover && (
        <div
          className={
            showLanguagePopover
              ? styles.profileOptionsLanguage
              : styles.profileOptions
          }
        >
          <button
            className={styles.button}
            onClick={() => router.push("/requested-solicitations")}
          >
            <FiCalendar style={{ marginRight: "0.2rem" }} />
            {t("reserve")}
          </button>
          <button
            className={styles.button}
            onClick={() => setShowLanguagePopover(!showLanguagePopover)}
          >
            <GrLanguage style={{ marginRight: "0.2rem" }} />
            {t("language")}
          </button>
          {showLanguagePopover && <LanguageSelector />}
          <button className={styles.button} onClick={props.onClick}>
            <FiLogOut style={{ marginRight: "0.2rem" }} />
            {t("logout")}
          </button>
        </div>
      )}
    </div>
  );
}
