import Image from "next/image";

interface Props {
  onClick?: () => void;
  image: string | null;
}

export function UserAccountCircle(props: Props) {
  return (
    <Image
      src={(props.image) ? 
        props.image :
        "/account_circle.svg"
      }
      alt="Account Icon"
      style={{ borderRadius: '50%' }}
      width={45}
      height={45}
      onClick={props.onClick}
    />
  );
}
