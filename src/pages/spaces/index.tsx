import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { NavBar } from "@/components/NavBar";
import { UserAvatar } from "@/components/UserAvatar";

export default function Spaces() {
  return (
    <>
      <Header>
        <NavBar />
        <UserAvatar />
      </Header>
      <List></List>
      <Footer></Footer>
    </>
  );
}
