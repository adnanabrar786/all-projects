import { Stack, Typography } from '@mui/material';
import Button from 'components/common/Button';
import Calender from 'components/common/Calender';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { toast } from 'react-toastify';
import ShowAppLoaderOrContent from '../ShowAppLoaderOrContent';
import TitleName from './TitleName';
import { NEW_ONBOARDING_STEPS_KEYS } from 'constants/localStorage';

const WeddingDate = ({ nextClick }) => {
  const [value, setValue] = useState<any>(null);

  const handleChange = (newValue) => {
    const date = moment(newValue.toDate()).unix();
    if (date) {
      localStorage.setItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_DATE, date.toString());
      setValue(newValue.toDate());
    }
  };

  const handleClick = () => {
    if (!value) {
      toast.error('Please Select WeddingDate');
      return;
    }
    nextClick();
  };

  useEffect(() => {
    const wedDate = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_DATE);
    if (wedDate) {
      const wedding_date = moment.unix(Number(wedDate)).utc().toDate();
      setValue(dayjs(wedding_date));
    }
  }, []);

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        justifyContent: { lg: 'flex-start', xs: 'space-between' },
      }}
    >
      <Stack>
        <TitleName title="What is your wedding date?" />
        <Stack
          direction={'row'}
          sx={{
            marginTop: '3rem',
          }}
        >
          {/* <Stack>
            <Image src={'/images/onboarding/box.svg'} alt="dress" width={20} height={20} />
          </Stack> */}

          <Calender
            value={value}
            handleChange={handleChange}
            sx={{
              '& .MuiInputBase-root': {
                fieldset: {
                  borderWidth: 'none',
                  border: 'none !important',
                },
              },
            }}
          />
        </Stack>
      </Stack>
      <Stack sx={{ marginTop: { lg: '15.5rem', xs: '2rem' }, marginBottom: { lg: '14rem', xs: '2.75rem' } }}>
        <Button
          className="flex justify-center items-center xl:h-10 cursor-pointer rounded-lg w-full py-7 bg-[#00CAA599!important] h-[68px]"
          type="submit"
          id="next-btn"
          onClick={handleClick}
        >
          <div className="flex justify-center items-center font-semibold px-8 ">
            <ShowAppLoaderOrContent data={false} size={30} color={'#fff'}>
              <Stack
                direction={'row'}
                sx={{
                  gap: '0.25rem',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 700,
                  }}
                >
                  Next
                </Typography>
                <BsArrowRightShort fontSize={'30px'} />
              </Stack>
            </ShowAppLoaderOrContent>
          </div>
        </Button>
      </Stack>
    </Stack>
  );
};

export default WeddingDate;
