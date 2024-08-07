import Image from "next/image";
import Loading from "@/components/Loading";
import searchGif from "@/assets/searching.gif";
import { useTranslations } from "next-intl";

export function SpaceLoading() {
  const t = useTranslations();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src={searchGif} width={200} alt="Searching" />
      <Loading loadingLabel={t("loading-space")} />
    </div>
  );
}
