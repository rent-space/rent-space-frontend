import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface FloatingProps {
  route: "service" | "space";
}

const userTypeMap = {
  space: "PLACE_OWNER",
  service: "SERVICE_OWNER",
};

export function FloatingButton({ route }: FloatingProps) {
  const router = useRouter();
  const { data } = useSession();

  const shouldBeHidden =
    data?.user && data?.user?.userType !== userTypeMap[route];

  if (shouldBeHidden) return null;

  const navigateToNew = (route: string) => {
    router.push(`/${route}/new`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.floatingButton}
        onClick={() => navigateToNew(route)}
      >
        +
      </button>
    </div>
  );
}
