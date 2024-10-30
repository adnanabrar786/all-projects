import { LoadingIcon } from "constants/images.routes";
import Image from "next/image";

export default function SmallLoader() {
  return (
    <Image
      priority
      width={21}
      height={20}
      alt={"icon"}
      src={LoadingIcon}
      className={"rotating"}
    />
  );
}
