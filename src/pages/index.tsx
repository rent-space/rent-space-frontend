import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();

  const logIn = () => {
    router.push("/home");
  };

  return (
    <>
      <Header />

      <Button variant="primary" onClick={logIn}>
        Login
      </Button>
      <Button variant="secondary">Cadastrar</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
    </>
  );
}
