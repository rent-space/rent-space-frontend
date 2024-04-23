import { useSession } from "next-auth/react";
import Image from "next/image";

interface Props {
  onClick?: () => void;
}

export function IconAccountCircle(props: Props) {
  const session = useSession();

  return (
    <Image
      src={(session && session.data?.user?.image) ? 
        session.data?.user?.image :
        "/account_circle.svg"
      }
      alt="Account Icon"
      style={{ borderRadius: '50%' }}
      width={45}
      height={45}
      onClick={props.onClick}
    />
  );
}
