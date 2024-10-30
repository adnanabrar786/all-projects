import { ReactNode } from 'react';

type Props = {
  condition: boolean;
  children: ReactNode;
  text: string;
};

export default function ShowAppTextOrContent({ condition, text, children }: Props) {
  return <>{condition ? <p>{text}</p> : <>{children}</>}</>;
}
