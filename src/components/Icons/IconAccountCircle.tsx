import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

import styles from './IconAccountCircle.module.css';
import { useRouter } from "next/router";

interface Props {
  onClick?: () => void;
}

export function IconAccountCircle(props: Props) {
  const session = useSession();
  const router = useRouter();

  const [showPopover, setShowPopover] = useState<boolean>(false);

  return (
    <div style={{ position: 'relative', overflow: 'visible' }}>
      <Image
        src={(session && session.data?.user?.image) ? 
          session.data?.user?.image :
          "/account_circle.svg"
        }
        alt="Account Icon"
        className={styles.roundedImage}
        width={45}
        height={45}
        onClick={() => setShowPopover(!showPopover)}
      />
      {showPopover &&
        <div className={styles.profileOptions}>
          <button className={styles.button} onClick={() => router.push("/requested-solicitations")}>Reservas</button>
          <button className={styles.button} onClick={() => props.onClick}>Logout</button>
        </div>
      }
    </div>
  );
}
