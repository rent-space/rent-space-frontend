import { useRouter } from "next/router";
import { IconAccountCircle } from "../Icons/IconAccountCircle";
import { signOut, useSession } from "next-auth/react";

export function UserAvatar() {
  const router = useRouter();
  // const {session: } = useSession();

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div onClick={logout}>
      <IconAccountCircle onClick={logout} />
    </div>
  );
}
