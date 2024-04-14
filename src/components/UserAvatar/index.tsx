import { IconAccountCircle } from "../Icons/IconAccountCircle";
import { signOut, useSession } from "next-auth/react";

export function UserAvatar() {
  const session = useSession();

  console.log(session);

  const logout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div onClick={logout}>
      <IconAccountCircle onClick={logout} />
    </div>
  );
}
