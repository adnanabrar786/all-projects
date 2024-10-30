import Image from 'next/image';
import { useEffect, useState } from 'react';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import { useUserInfo } from 'state/useUser';

type Props = {
  name?: string;
  relation?: string[];
  number?: string;
  email?: string;
  image?: string;
  id: string;
  checked?: boolean;
};
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const ShareTimeline = ({ name, relation = [], number, email, image, checked, id }: Props) => {
  const { isPremium } = useUserInfo();
  const [isChecked, setCheck] = useState(false);

  useEffect(() => {
    if (checked == true) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [checked]);
  return (
    <div
      className={`${
        isPremium ? 'hover:border-2 hover:border-secondary' : 'opacity-40'
      } py-2 sm:p-3 my-4 flex border-2 border-glossy_grape/10  border- drop-shadow-lg bg-white rounded-lg justify-between  h-[144px]`}
    >
      <div className="flex">
        <div className="flex items-center ">
          <div
            className={`max-h-[100px] max-w-[100px] h-[80px] w-[80px] relative bg-non_photo_blue text-w_9xl text-white font-semibold uppercase items-center justify-center flex rounded-[7px] `}
          >
            {image ? (
              <Image src={image} layout="fill" alt="user" className="rounded-lg" />
            ) : (
              <p>{name!.split(' ')[0][0] + name!.split(' ')[1][0]}</p>
            )}
          </div>
        </div>

        <div className="ml-6 py-3">
          <p className="font-semibold text-base mb-2 text-purple">{name}</p>
          <div className="w-[100px] sm:w-[280px] md:w-[250px] lg:w-[160px] xl:w-[240px] overflow-x-auto flex scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
            <div className="flex">
              {relation.map((item: string, index) => (
                <p key={index} className="whitespace-nowrap pl-1 font-medium text-xs sm:text-sm text-purple">
                  {item + (index === relation!.length - 1 ? '' : ',')}
                </p>
              ))}
            </div>
          </div>
          <p className="font-medium text-xs sm:text-sm text-purple">{number}</p>
          <p className="font-medium text-xs sm:text-sm text-purple w-5/6 overflow-x-auto">{email}</p>
        </div>
      </div>
      <div className="text-dark_vanilla">
        <Checkbox
          disabled={!isPremium}
          id={id}
          {...label}
          checked={isChecked}
          onChange={() => setCheck(!isChecked)}
          sx={{
            [`&, &.${checkboxClasses.checked}`]: {
              color: '#C8A2C8',
            },
          }}
        />
      </div>
    </div>
  );
};

export default ShareTimeline;
