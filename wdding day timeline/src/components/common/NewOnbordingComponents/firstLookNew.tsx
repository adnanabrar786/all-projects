import { Stack, Typography } from '@mui/material';
import Button from 'components/common/Button';
import { NEW_ONBOARDING_STEPS_KEYS } from 'constants/localStorage';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import ShowAppLoaderOrContent from '../ShowAppLoaderOrContent';
import CouplesCard from './CouplesCard';
import TitleName from './TitleName';

const FirstLookNew = ({ nextClick }) => {
  const formik = useFormik({
    initialValues: {
      primary: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
  });

  const yesOrNo = [
    { id: 1, label: 'Yes', img: '/images/onboarding/like.svg' },
    { id: 2, label: 'No', img: '/images/onboarding/disLike.svg' },
  ];

  const handleClick = (e) => {
    if (e.target.name === 'primary') {
      formik.setFieldValue('primary', e.target.value);
    }
  };

  useEffect(() => {
    if (formik.values.primary) {
      localStorage.setItem(NEW_ONBOARDING_STEPS_KEYS.FIRST_LOOK, formik.values.primary);
    }
  }, [formik.values.primary]);

  useEffect(() => {
    const type = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.FIRST_LOOK);
    if (type) {
      formik.setFieldValue('primary', type);
    }
  }, []);

  return (
    <Stack
      sx={{
        height: { lg: '100%', xs: '100%' },
        justifyContent: { lg: 'flex-start', xs: 'space-between' },
      }}
    >
      <Stack>
        <Stack
          sx={{
            gap: '1rem',
          }}
        >
          <TitleName title="Are you planning on a ‘First Look’ with your fiancé(e)?" />
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'rgba(0, 0, 0, 0.4)',
              textAlign: 'center',
              lineHeight: '16.94px',
              fontStyle: 'italic',
              span: {
                color: '#00CAA5',
                fontStyle: 'italic',
                fontWeight: 600,
              },
            }}
          >
            <span> A First Look </span>is a special moment where you and your fiancé(e) see each other privately for the
            first time before the ceremony.
          </Typography>

          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'rgba(0, 0, 0, 0.4)',
              textAlign: 'center',
              lineHeight: '16.94px',
              fontStyle: 'italic',
            }}
          >
            It allows you more freedom to express the joy of seeing each other for the first time, spend more time
            together on your wedding day, get most of the photos out of the way before the ceremony, and participate in
            your cocktail hour.
          </Typography>
        </Stack>

        <Stack
          sx={{
            marginTop: '1.5rem',
          }}
        >
          <CouplesCard list={yesOrNo} onChange={handleClick} value={formik.values.primary} name="primary" />
        </Stack>
      </Stack>
      <Stack sx={{ marginTop: { lg: '2rem', xs: '2rem' }, marginBottom: { lg: '0rem', xs: '2.75rem' } }}>
        <Button
          className="flex justify-center items-center h-9 xl:h-10 cursor-pointer rounded-lg w-full py-7 bg-[#00CAA599!important] h-[68px]"
          type="submit"
          id="next-btn"
          onClick={nextClick}
          disabled={formik.values.primary ? false : true}
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
  );
};

export default FirstLookNew;
