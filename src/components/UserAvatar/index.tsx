import { IconAccountCircle } from "../Icons/IconAccountCircle";
import { signOut, useSession } from "next-auth/react";

export function UserAvatar() {
  const logout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div>
      <IconAccountCircle onClick={logout} />
    </div>
  );
}
