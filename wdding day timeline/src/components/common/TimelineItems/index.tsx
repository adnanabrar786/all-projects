import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { useUserInfo } from 'state/useUser';
import { getFirstLetter } from 'utils/strings';
import ShowImageOrLetter from '../ShowImageOrLetter';
import RelationList from './RelationList';
type Props = {
  name?: string | string[];
  relation?: string[];
  number?: string;
  email?: string;
  image?: string;
  id?: string;
  checked?: boolean;
  onClick?: () => void;
  checkbox?: boolean;
  edit?: boolean;
  setSelected?: any;
  selected?: string[];
  iconClass?: string;
  relationClass?: string;
};
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const TimelineItem = ({
  name,
  relation,
  number,
  email,
  image,
  checked,
  id,
  onClick,
  setSelected,
  selected,
  checkbox,
  edit,
  iconClass,
  relationClass,
}: Props) => {
  const { isPremium } = useUserInfo();
  const [isChecked, setCheck] = useState(true);

  useEffect(() => {
    if (checked == true) {
      setCheck(true);
      return;
    }
    setCheck(false);
  }, [checked]);
  // ${isPro ? 'hover:border-2 hover:border-secondary' : 'opacity-40'}
  return (
    <div
      className={`
        !py-[0px] xl:!py-2 sm:p-3 my-4  xl:h-[144px]  flex border-2 border-glossy_grape/10 drop-shadow-lg bg-white rounded-lg justify-between`}
    >
      <div className="flex">
        <div className="flex items-center ">
          <div
            className={`ml-4 sm:ml-0 max-h-[70px] max-w-[70px]  h-[70px] sm:h-[80px] lg:h-[60px] xl:h-[80px] w-[70px] sm:w-[80px] lg:w-[60px] xl:w-[80px] relative  text-w_9xl font-semibold uppercase items-center justify-center flex rounded-[7px] ${
              iconClass ? iconClass : 'bg-non_photo_blue text-white'
            } `}
          >
            <ShowImageOrLetter img={image} condition={image ? true : false}>
              <p>{name && typeof name == 'string' ? getFirstLetter(name) : name && name[0][0] + name[1][0]}</p>
            </ShowImageOrLetter>
          </div>
        </div>
        <div className="ml-4 sm:ml-6 py-3">
          <p className="font-semibold text-w_sm xl:text-base mb-2 text-purple">
            {name && typeof name == 'string' ? name : name && name[0] + ' ' + name[1]}
          </p>
          <div
            className={`${
              relationClass ? relationClass : 'w-[100px] sm:w-[280px] md:w-[250px] lg:w-[160px] xl:w-[240px]'
            }   flex `}
          >
            <div className="flex">
              <RelationList relation={relation ?? []} />
            </div>
          </div>

          <p className="font-medium text-w_xs1 xl:text-sm  text-purple">{formatPhoneNumberIntl(`${number}`)}</p>
          <p className="font-medium text-w_xs1 xl:text-sm text-purple lowercase">{email}</p>
        </div>
      </div>
      <div className="ml-[-90px]">
        {checkbox && (
          <div className="text-dark_vanilla">
            <Checkbox
              disabled={!isPremium}
              id={id}
              {...label}
              checked={isChecked}
              onClick={() => {
                if (!isChecked) {
                  setSelected([...(selected ?? []), email]);
                } else {
                  const filtered = selected ? selected.filter((item: string) => item !== email) : [];
                  setSelected(filtered);
                }
              }}
              onChange={() => setCheck(!isChecked)}
              sx={{
                [`&, &.${checkboxClasses.checked}`]: {
                  color: '#C8A2C8',
                },
              }}
            />
          </div>
        )}
        {edit && (
          <div className="text-dark_vanilla cursor-pointer" onClick={onClick}>
            <BiPencil fontSize={24} className="mt-6 xl:mt-10 mr-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
