import Image from 'next/image';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

type Prop = {
  image: string;
  name: string;
  type: string;
  number: string;
  email: string;
};

export default function VendorItem({ image, name, number, email, type }: Prop) {
  const initialLettersStyle = !image
    ? type === 'primary'
      ? 'bg-sea_green/50 text-w_9xl text-morning_blue  font-semibold uppercase items-center justify-center flex rounded-[7px]'
      : 'bg-non_photo_blue text-w_9xl text-white font-semibold uppercase items-center justify-center flex rounded-[7px]'
    : '';
  return (
    <div className="flex gap-4 sm:gap-8 drop-shadow-lg bg-white rounded-lg pt-2 pb-0 px-2 w-[270px] sm:w-[300px]">
      <div
        className={`max-w-[100px] w-[80px] sm:w-[100px] max-h-[100px] h-[80px] sm:h-[100px] relative  ${initialLettersStyle}`}
      >
        {image ? <Image src={image} layout="fill" alt="user" className=" rounded-lg" /> : <p>{name[0]}</p>}{' '}
      </div>
      <div className="text-purple text-w_sm1 sm:text-base font-medium">
        <p className="text-base sm:text-lg font-semibold mb-2">{name}</p>
        <p>{type}</p>
        <p>{formatPhoneNumberIntl(number)}</p>
        <p>{email}</p>
      </div>
    </div>
  );
}
