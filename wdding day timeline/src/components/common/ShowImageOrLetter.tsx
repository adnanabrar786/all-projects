import Image from 'next/image';
import { ReactNode } from 'react';

type Props = {
  img?: string;
  condition: boolean;
  children: ReactNode;
};

export default function ShowImageOrLetter({ img, condition, children }: Props) {
  return (
    <>{condition && img ? <Image src={img} layout="fill" alt="user" className="rounded-lg" /> : <>{children}</>}</>
  );
}
