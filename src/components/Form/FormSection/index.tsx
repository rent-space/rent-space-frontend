import { Text } from "@/components/Text";
import styles from "./style.module.css";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function FormSection(props: Props) {
  const { title, children } = props;

  const [visible, setVisible] = useState(true);

  const toggle = () => setVisible(!visible);

  return (
    <section className={styles.section}>
      <Text variant="section" tone="primary">
        {visible ? (
          <IoIosArrowUp onClick={toggle} />
        ) : (
          <IoIosArrowDown onClick={toggle} />
        )}
        {" " + title}
      </Text>
      {visible && children}
    </section>
  );
}
