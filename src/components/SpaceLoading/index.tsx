import Image from "next/image";
import Loading from "@/components/Loading";
import searchGif from "@/assets/searching.gif";

export function SpaceLoading() {
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
      <Loading loadingLabel="Estamos carregando as informações desse espaço" />
    </div>
  );
}
