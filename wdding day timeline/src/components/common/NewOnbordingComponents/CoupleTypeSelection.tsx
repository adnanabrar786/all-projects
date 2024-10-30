import { Stack, Typography } from '@mui/material';
import Button from 'components/common/Button';
import { COUPLETYPES } from 'constants/constants';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { errorToast } from 'utils/toast';
import { brideGroom } from 'validators';
import ShowAppLoaderOrContent from '../ShowAppLoaderOrContent';
import CouplesCard from './CouplesCard';
import TitleName from './TitleName';
import { NEW_ONBOARDING_STEPS_KEYS } from 'constants/localStorage';

export default function CoupleTypeSelection({ nextClick }) {
  const handleClickPrimary = (e) => {
    if (e.target.name === 'primary') {
      formik.setFieldValue('primary', e.target.value);
    }
  };
  const handleClickSendary = (e) => {
    if (e.target.name === 'secondary') {
      formik.setFieldValue('secondary', e.target.value);
    }
  };

  const formik = useFormik({
    initialValues: {
      primary: '',
      secondary: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    validationSchema: brideGroom,
    onSubmit: () => {
      nextClick();
    },
  });

  useEffect(() => {
    if (formik.values.primary && formik.values.secondary) {
      localStorage.setItem(
        NEW_ONBOARDING_STEPS_KEYS.WEDDING_TYPE,
        JSON.stringify({ primary: formik.values.primary, secondary: formik.values.secondary }),
      );
    }
  }, [formik.values.primary, formik.values.secondary]);

  useEffect(() => {
    const type = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_TYPE);
    if (type) {
      const data = JSON.parse(type);
      formik.setFieldValue('primary', data.primary);
      formik.setFieldValue('secondary', data.secondary);
    }
  }, []);

  const handleValidation = () => {
    if (!formik.values.primary || !formik.values.secondary) {
      errorToast('Please select your and your fiancé(e)');
    }
  };

  return (
    <Stack
      component={'form'}
      onSubmit={formik.handleSubmit}
      sx={{
        gap: '1rem',
        height: { lg: '100%', xs: '100%' },
        justifyContent: { lg: 'flex-start', xs: 'space-between' },
      }}
    >
      <Stack
        sx={{
          gap: '2.125rem',
        }}
      >
        <Stack>
          <TitleName title="I am a:" />

          <Stack
            sx={{
              marginTop: '1.5rem',
            }}
          >
            <CouplesCard
              list={COUPLETYPES}
              onChange={handleClickPrimary}
              value={formik.values.primary}
              name="primary"
            />
          </Stack>
        </Stack>

        <Stack>
          <TitleName title="My fiancé(e) is a:" />

          <div className="my-5 text-w_xs1">
            <CouplesCard
              list={COUPLETYPES}
              onChange={handleClickSendary}
              value={formik.values.secondary}
              name="secondary"
            />
          </div>
        </Stack>
      </Stack>
      <Stack
        sx={{
          marginBottom: { lg: '0rem', xs: '2.75rem' },
          marginTop: { lg: 'rem', xs: '2.75rem' },
        }}
      >
        <Button
          className="flex justify-center items-center xl:h-10 cursor-pointer rounded-lg w-full py-7 bg-[#00CAA599!important] h-[68px]"
          type="submit"
          id="next-btn"
          onClick={handleValidation}
          // onClick={nextClick}
          // disabled={formik.values.primary && formik.values.secondary ? false : true}
        >
          <div className="flex justify-center items-center font-semibold px-8 py-2 w-screen">
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
}
