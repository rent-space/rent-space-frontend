import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { Page } from "@/components/Page";
import { UserAvatar } from "@/components/UserAvatar";
import { useRouter } from "next/router";

export default function Services() {

  const router = useRouter();

  const navigateToDetailsSpace = () => {
    router.push('/space/details')
  }

  return (
    <>
      <Header>
        <NavBar />
        <UserAvatar />
      </Header>
      <Page>
        <button onClick={navigateToDetailsSpace}>SERVICES</button>
      </Page>
    </>
  );
}
