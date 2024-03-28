import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { Page } from "@/components/Page";
import { UserAvatar } from "@/components/UserAvatar";

export default function Services() {
  return (
    <>
      <Header>
        <NavBar />
        <UserAvatar />
      </Header>
      <Page></Page>
    </>
  );
}
