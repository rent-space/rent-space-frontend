interface Props {
  children: React.ReactNode;
  gap?: number;
}

export default function Inline(props: Props) {
  const { children, gap } = props;

  return (
    <div
      style={{
        display: "flex",
        gap: gap ?? "1rem",
        justifyContent: "space-between",
      }}
    >
      {children}
    </div>
  );
}
