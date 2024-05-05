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
  noOverFlow?: boolean;
}

export function Text(props: Props) {
  const { size, children, weight, color, onClick, noOverFlow } = props;

  return (
    <span
      data-size={size}
      data-weight={weight}
      data-no-overflow={noOverFlow}
      data-color={color}
      className={styles.text}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
