import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { NavBar } from "@/components/NavBar";
import { UserAvatar } from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Spaces() {
  const router = useRouter();

  const navigateToDetailsSpace = () => {
    router.push("/space/details");
  };

  const navigateToNewSpace = () => {
    router.push("/space/new");
  };

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
      <List>
        <div>
          <Button variant="primary" size="small" onClick={navigateToNewSpace}>
            Cadastrar espaço
          </Button>
          <br />
          <Button
            variant="primary"
            size="small"
            onClick={navigateToDetailsSpace}
          >
            detalhes de espaço
          </Button>
        </div>
      </List>
      <Footer></Footer>
    </>
  );
}
