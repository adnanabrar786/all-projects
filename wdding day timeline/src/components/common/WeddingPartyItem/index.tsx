import Image from 'next/image';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

type Prop = {
  image: string;
  name: string;
  type: string;
  number: string;
  gmail: string;
};
export default function WeddingPartyItem({ image, name, type, number, gmail }: Prop) {
  const initialLettersStyle = !image
    ? type === 'primary'
      ? 'bg-sea_green/50 text-w_9xl text-morning_blue  font-semibold uppercase items-center justify-center flex rounded-[7px]'
      : 'bg-non_photo_blue text-w_9xl text-white font-semibold uppercase items-center justify-center flex rounded-[7px]'
    : '';
  return (
    <div className="flex gap-3 drop-shadow-lg bg-white rounded-lg py-2 px-2 w-[275px] sm:w-[300px]">
      <div className={`max-w-[80px] w-[80px] max-h-[80px] h-[80px] relative   ${initialLettersStyle}`}>
        {image ? <Image src={image} layout="fill" alt="user" className=" rounded-lg" /> : <p>{name[0]}</p>}
      </div>
      <div className="text-purple text-w_sm1 font-medium">
        <p className="text-base font-semibold mb-2">{name}</p>
        <p>{type}</p>
        <p>{formatPhoneNumberIntl(number)}</p>
        <p>{gmail}</p>
      </div>
    </div>
  );
}
