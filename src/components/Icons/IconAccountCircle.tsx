import Image from "next/image";

interface Props {
  onClick?: () => void;
}

export function IconAccountCircle(props: Props) {
  return (
    <Image
      src="/account_circle.svg"
      alt="Account Icon"
      width={45}
      height={45}
      onClick={props.onClick}
    />
  );
}
