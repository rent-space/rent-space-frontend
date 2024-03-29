import { Text } from "@/components/Text";
import styles from "./style.module.css";

interface Props {
  title: string;
  subtitle: string;
}

export default function FormTitle(props: Props) {
  const { title, subtitle } = props;

  return (
    <section className={styles.title}>
      <Text variant="title1" tone="primary">
        {title}
      </Text>
      <Text variant="section" tone="secondary">
        {subtitle}
      </Text>
    </section>
  );
}
