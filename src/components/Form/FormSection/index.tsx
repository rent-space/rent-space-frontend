import { Text } from "@/components/Text";
import styles from "./style.module.css";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function FormSection(props: Props) {
  const { title, children } = props;

  return (
    <section className={styles.section}>
      <Text variant="section" tone="primary">
        {title}
      </Text>
      {children}
    </section>
  );
}
