import { Button } from "@/components/Button";

export default function Home() {
  return (
    <>
      <h1>RentSpace</h1>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="primary">Principal</Button>
    </>
  );
}
