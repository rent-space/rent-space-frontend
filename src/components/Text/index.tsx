import styles from "./style.module.css";

interface Props {
  size:
    | "label"
    | "body"
    | "section"
    | "subtitle"
    | "title1"
    | "title2"
    | "title3";
  weight?: "light" | "regular" | "semibold" | "bold";
  color?: "black" | "gray" | "orange";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Text(props: Props) {
  const { size, children, weight, color, onClick } = props;

  return (
    <span
      data-size={size}
      data-weight={weight}
      data-color={color}
      className={styles.text}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
