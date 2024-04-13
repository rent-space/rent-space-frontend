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
      <Text size="title1" weight="semibold">
        {title}
      </Text>
      <Text size="section" color="gray">
        {subtitle}
      </Text>
    </section>
  );
}
