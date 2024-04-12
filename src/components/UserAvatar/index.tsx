import { IconAccountCircle } from "../Icons/IconAccountCircle";
import { signOut } from "next-auth/react";

export function UserAvatar() {
  const logout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div onClick={logout}>
      <IconAccountCircle onClick={logout} />
    </div>
  );
}
