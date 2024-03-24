import { useRouter } from "next/router";
import { IconAccountCircle } from "../Icons/IconAccountCircle";

export function UserAvatar() {
  const router = useRouter();

  const logout = () => {
    router.push("/");
  };

  return (
    <div onClick={logout}>
      <IconAccountCircle onClick={logout} />
    </div>
  );
}
