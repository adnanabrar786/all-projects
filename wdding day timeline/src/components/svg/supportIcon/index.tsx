import { BsBell } from 'react-icons/bs';

type Prop = {
  color: string;
};

export default function SupportIcon({ color }: Prop) {
  return <BsBell size={'22px'} />;
}
