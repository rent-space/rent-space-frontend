import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface FloatingProps {
  route: string;
}

export function FloatingButton({route}: FloatingProps) {
  const router = useRouter();
  const { data } = useSession();

  const isPlaceOwner = data?.user && data?.user?.userType === "PLACE_OWNER";

  if (!isPlaceOwner) return null;

  const navigateToNewSpace = (route:string) => {
    router.push(`/${route}/new`);
  };

  return (
    <div className={styles.container}>
      <button className={styles.floatingButton} onClick={()=>navigateToNewSpace(route)}>
        +
      </button>
    </div>
  );
}
