import Image from "next/image";
import { useRouter } from "next/router";

export function UserAvatar() {
  const router = useRouter();

  const logout = () => {
    router.push("/");
  };

  return (
    <div onClick={logout}>
      <Image
        src="/account_circle.svg"
        alt="Account Icon"
        width={45}
        height={45}
        onClick={logout}
      />
    </div>
  );
}
