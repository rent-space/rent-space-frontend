import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { NavBar } from "@/components/NavBar";
import { UserAvatar } from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Services() {
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

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
