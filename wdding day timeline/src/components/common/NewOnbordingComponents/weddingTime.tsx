import { ClickAwayListener, Stack, Typography } from '@mui/material';
import Button from 'components/common/Button';
import { CLOCK, MINUTES, ZONECOPY } from 'constants/time';
import { useFormik } from 'formik';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import ShowAppLoaderOrContent from '../ShowAppLoaderOrContent';
import CalenderBox from './CalenderBox';
import TitleName from './TitleName';
import { WeddingTimeValidation } from 'validators';
import { NEW_ONBOARDING_STEPS_KEYS } from 'constants/localStorage';

const WeddingTime = ({ nextClick }) => {
  const [showDateMenu, setShowDateMenu] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      clock: '',
      minutes: '',
      zone: '',
    },
    validationSchema: WeddingTimeValidation(),
    onSubmit: async (values) => {
      setTime();
      nextClick();
    },
  });

  const setFormikTime = (zone, hours, minutes) => {
    formik.setFieldValue('zone', zone);
    formik.setFieldValue('clock', hours);
    formik.setFieldValue('minutes', minutes);
  };

  useEffect(() => {
    const weddingEpochUTC = parseInt(localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_TIME)!);
    if (weddingEpochUTC) {
      const weddingDateTimeUTC = DateTime.fromSeconds(weddingEpochUTC).setZone('local');
      const hour = weddingDateTimeUTC.hour;
      let minutes: number | string = weddingDateTimeUTC.minute;
      if (minutes == 0) {
        minutes = '00';
      }
      if (minutes == 5) {
        minutes = '05';
      }
      let zone, clock;

      if (hour === 0) {
        clock = 12;
        zone = 'AM';
      } else if (hour < 12) {
        clock = hour;
        zone = 'AM';
      } else if (hour === 12) {
        clock = 12;
        zone = 'PM';
      } else {
        clock = hour - 12;
        zone = 'PM';
      }

      setFormikTime(zone, clock, minutes);
    }
  }, []);

  const setTime = () => {
    const wedDate = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_DATE);
    if (wedDate) {
      const weddingDate = DateTime.fromSeconds(Number(wedDate)).toISODate();
      const clock = Number(formik.values.clock);
      const minutes = Number(formik.values.minutes);

      if (isNaN(clock) || isNaN(minutes)) {
        console.error('Invalid clock or minutes value');
      } else {
        let hour;
        if (clock === 12) {
          hour = formik.values.zone === 'AM' ? 0 : 12;
        } else {
          hour = clock + (formik.values.zone === 'PM' ? 12 : 0);
        }
        let weddingDateTime: any = DateTime.fromObject({
          year: Number(weddingDate.split('-')[0]),
          month: Number(weddingDate.split('-')[1]),
          day: Number(weddingDate.split('-')[2]),
          hour,
          minute: minutes,
        });
        weddingDateTime = weddingDateTime.setZone('GMT').toSeconds();
        const localOffset = DateTime.local().offset;
        if (!isNaN(weddingDateTime)) {
          localStorage.setItem(NEW_ONBOARDING_STEPS_KEYS.OFFSET, localOffset.toString());
          localStorage.setItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_TIME, weddingDateTime);
        }
      }
    }
  };

  return (
    <Stack
      component={'form'}
      onSubmit={formik.handleSubmit}
      sx={{
        height: { lg: '100%', xs: '100%' },
      }}
    >
      <Stack
        sx={{
          height: { lg: '100%', xs: '100%' },
          justifyContent: { lg: 'flex-start', xs: 'space-between' },
        }}
      >
        <Stack
          sx={{
            gap: '2.188rem',
          }}
        >
          <TitleName
            title="What time is your wedding ceremony?"
            sx={{
              padding: '0rem 1.5rem',
            }}
          />

          <Stack
            onClick={() => setShowDateMenu(true)}
            direction={'row'}
            sx={{
              boxShadow: '0px 4px 4px 0px #00000033',
              padding: '1.875rem 1rem',
              borderRadius: '0.5rem',
              position: 'relative',
            }}
          >
            <Stack
              direction={'row'}
              sx={{
                gap: '0.75rem',
                alignItems: 'center',
              }}
            >
              <Image src={'/images/onboarding/clock.svg'} alt="dress" width={20} height={20} />
              {formik.values.zone === '' && formik.values.clock == '' && formik.values.minutes === '' ? (
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: '1rem',
                    lineHeight: '1.21rem',
                    color: 'rgba(0, 0, 0, 0.4)',
                  }}
                >
                  Click to select
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: '1rem',
                    lineHeight: '1.026rem',
                    color: '#00000066',
                  }}
                >
                  {formik.values.zone && formik.values.clock && formik.values.minutes
                    ? `${formik.values.clock}:${formik.values.minutes} ${formik.values.zone}`
                    : `${formik.values.clock}:${formik.values.minutes} ${formik.values.zone}`}
                </Typography>
              )}
            </Stack>

            {showDateMenu ? (
              <ClickAwayListener
                onClickAway={() => {
                  setShowDateMenu(false);
                }}
              >
                <Stack direction={'row'}>
                  <Stack
                    direction={'row'}
                    sx={{
                      marginTop: '0.5rem',
                      gap: '0.625rem',
                      backgroundColor: '#ffffff',
                      width: 'fit-content',
                      boxShadow: ' 0px 8px 10px 1px #00000024',
                      position: 'absolute',
                      zIndex: '100',
                      padding: '1rem',
                      left: '0',
                      top: '4.7rem',
                    }}
                  >
                    <CalenderBox
                      data={CLOCK}
                      value={formik.values.clock}
                      onClick={(value) => formik.setFieldValue('clock', value)}
                    />

                    <CalenderBox
                      data={MINUTES}
                      value={formik.values.minutes}
                      onClick={(value) => formik.setFieldValue('minutes', value)}
                    />

                    <CalenderBox
                      data={ZONECOPY}
                      value={formik.values.zone}
                      onClick={(value) => formik.setFieldValue('zone', value)}
                      sx={{
                        fontWeight: '700',
                      }}
                    />
                  </Stack>
                </Stack>
              </ClickAwayListener>
            ) : null}
          </Stack>
        </Stack>
        <Stack sx={{ marginTop: '4px', color: 'red', fontSize: '14px', fontWeight: 500 }}>
          {(formik.touched.clock && formik.errors.clock) ||
            (formik.touched.minutes && formik.errors.minutes) ||
            (formik.touched.zone && formik.errors.zone)}
        </Stack>
        <Stack sx={{ marginTop: { lg: '15.5rem', xs: '2rem' }, marginBottom: { lg: '0rem', xs: '2.75rem' } }}>
          <Button
            className="flex justify-center items-center xl:h-10 cursor-pointer rounded-lg w-full py-7 bg-[#00CAA599!important] h-[68px]"
            type="submit"
            id="next-btn"
          >
            <div className="flex justify-center items-center font-semibold px-8 py-2">
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
    </Stack>
  );
};

export default WeddingTime;
