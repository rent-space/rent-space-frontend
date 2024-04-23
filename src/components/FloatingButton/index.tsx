import { ButtonHTMLAttributes, useState } from "react"
import styles from './styles.module.css';
import { useRouter } from "next/router";

export function FloatingButton() {
    const router = useRouter();

    const navigateToNewSpace = () => {
      router.push("/space/new");
    };
    
    return (
        <div className={styles.container}>
            <button className={styles.floatingButton} onClick={navigateToNewSpace}>+</button>
      </div>
    )
}