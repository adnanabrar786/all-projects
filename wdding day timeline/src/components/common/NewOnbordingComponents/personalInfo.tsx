import { Stack, Typography } from '@mui/material';
import { GettingTypeCategory } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Button from 'components/common/Button';
import CustomText from 'components/pages/home/NewDashboard/CustomText';
import { NEW_ACTIVE_ONBOARDING_STEP_KEY, NEW_ONBOARDING_STEPS_KEYS, USER_ID_KEY } from 'constants/localStorage';
import { useFormik } from 'formik';
import { DateTime } from 'luxon';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { LOGIN_URL } from 'routes';
import { WeddingService } from 'services/wedding.service';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { newOnboardingForm } from 'validators';
import Input from '../InputField';
import ShowAppLoaderOrContent from '../ShowAppLoaderOrContent';
import CompleteLoading from './CompleteLoading';
import Loader from './Loader';
import TitleName from './TitleName';

interface Props {
  setHideProgressbar: (value: boolean) => void;
}

const PersonalInfo = ({ setHideProgressbar }: Props) => {
  const [emailAlreadyExit, seEmailAlreadyExit] = useState('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const weddingService = new WeddingService();
  const handleClick = () => {
    setIsLoading(true);
    setHideProgressbar(true);
    weddingMutation.mutate(createWedBody());
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      fiance_first_name: '',
      email: '',
    },
    validationSchema: newOnboardingForm,
    onSubmit: handleClick,
  });

  const [Loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (formik.values.first_name && formik.values.email) {
      localStorage.setItem(
        NEW_ONBOARDING_STEPS_KEYS.PERSONAL_INFO,
        JSON.stringify({
          name: formik.values.first_name,
          email: formik.values.email,
          fiance_first_name: formik.values.fiance_first_name,
        }),
      );
    }
  }, [formik.values]);

  useEffect(() => {
    const info = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.PERSONAL_INFO);
    if (info) {
      const data = JSON.parse(info);
      if (data && data.name && data.email) {
        formik.setFieldValue('first_name', data.name);
        formik.setFieldValue('email', data.email);
        formik.setFieldValue('fiance_first_name', data.fiance_first_name);
      }
    }
  }, []);

  const weddingMutation = useMutation((body: any) => weddingService.CreateWedding(body), {
    onSuccess: ({ data }) => {
      localStorage.removeItem(NEW_ACTIVE_ONBOARDING_STEP_KEY);
      if (data.data.data.body) {
        const stringifyData = data.data.data.body;
        const parsedData = JSON.parse(stringifyData);
        localStorage.setItem(USER_ID_KEY, parsedData.data.userId);
        setIsLoading(false);
        setIsCompleted(true);
      } else if (data.data.data.Done) {
        // TODO: confirm, this check is if user already exist
        localStorage.setItem(USER_ID_KEY, data.data.data.userId);
        setIsLoading(false);
        setIsCompleted(true);
      }
    },
    onError(error: AxiosError) {
      const err: any = error;
      if (err.response.data.error) {
        if (err.response.data.message === ERROR_MESSAGES.EMAIL_ALREADY_EXISTS) {
          seEmailAlreadyExit(err.response.data.message);
          setIsLoading(false);
          return;
        }
        toast.error(err.message);
        setIsLoading(false);
      }
    },
  });

  function createWedBody() {
    const type = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_TYPE);
    const offset = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.OFFSET);
    const date = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_DATE);
    const info = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.PERSONAL_INFO);
    const firstLook = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.FIRST_LOOK);
    const ceremony = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.CEREMONY_LOCATION_SELECTION);
    const reception = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.RECEPTION_LOCATION);
    const primaryDressed = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.PRIMARY_GETTING_DRESSED);
    const secondaryDressed = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.SECONDARY_GETTING_DRESSED);
    const weddingEpochUTC = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_TIME)
      ? parseInt(localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_TIME)!)
      : 0;
    const primaryHairMakeup = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.PRIMARY_HAIR_AND_MAKEUP);
    const secondaryHairMakeup = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.SECONDARY_HAIR_AND_MAKEUP);
    const firstLookLocation = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.FIRST_LOOK_LOCATION);

    const personalIfo = JSON.parse(info!);
    const types = JSON.parse(type!);
    const ceremonyData = JSON.parse(ceremony!);
    const receptionData = JSON.parse(reception!);
    const primaryDressedData = JSON.parse(primaryDressed!);
    const secondaryDressedData = JSON.parse(secondaryDressed!);
    const primaryHairMakeupData = JSON.parse(primaryHairMakeup!);
    const secondaryHairMakeupData = JSON.parse(secondaryHairMakeup!);
    const firstLookLocationData = JSON.parse(firstLookLocation!);

    const body: any = {
      data: {
        timezone_offset: Number(offset),
        weddingDate: Number(date),
        timezone: DateTime.local().toFormat('z'),
        primary: {
          email: personalIfo.email,
          first_name: personalIfo.name,
          couple_type_id: types.primary === 'Bride' ? 2 : 1,
        },
        secondary: {
          email: null,
          first_name: personalIfo.fiance_first_name,
          couple_type_id: types.secondary === 'Bride' ? 2 : 1,
        },
        ceremony: {
          location_metadata: ceremonyData,
          lat: ceremonyData.geometry.location.lat,
          long: ceremonyData.geometry.location.lng,
          start_time: weddingEpochUTC,
        },
        reception: {
          lat: receptionData.geometry.location.lat,
          long: receptionData.geometry.location.lng,
          location_metadata: receptionData,
        },
      },
    };

    if (primaryDressedData != undefined || primaryDressedData != null) {
      body.data.primary_dressed = {
        lat: primaryDressedData.geometry.location.lat,
        long: primaryDressedData.geometry.location.lng,
        location_metadata: primaryDressedData,
        type: GettingTypeCategory.DRESSING,
      };
    }

    if (secondaryDressedData != undefined || secondaryDressedData != null) {
      body.data.secondary_dressed = {
        lat: secondaryDressedData.geometry.location.lat,
        long: secondaryDressedData.geometry.location.lng,
        location_metadata: secondaryDressedData,
        type: GettingTypeCategory.DRESSING,
      };
    }

    if (primaryHairMakeupData != undefined || primaryHairMakeupData != null) {
      body.data.primary_hairMakeup = {
        lat: primaryHairMakeupData.geometry.location.lat,
        long: primaryHairMakeupData.geometry.location.lng,
        location_metadata: primaryHairMakeupData,
        type: GettingTypeCategory.HAIR_AND_MAKEUP,
      };
    }

    if (secondaryHairMakeupData != undefined || secondaryHairMakeupData != null) {
      body.data.secondary_hairMakeup = {
        lat: secondaryHairMakeupData.geometry.location.lat,
        long: secondaryHairMakeupData.geometry.location.lng,
        location_metadata: secondaryHairMakeupData,
        type: GettingTypeCategory.HAIR_AND_MAKEUP,
      };
    }

    if (firstLook === 'No') {
      body.data.firstlook = {
        status: false,
        lat: null,
        long: null,
      };
    }
    if (firstLookLocationData != undefined || (firstLookLocationData != null && firstLook === 'Yes')) {
      body.data.firstlook = {
        status: true,
        lat: firstLookLocationData.geometry.location.lat,
        long: firstLookLocationData.geometry.location.lng,
        location_metadata: firstLookLocationData,
      };
    }

    return body;
  }

  return (
    <Stack
      sx={{
        height: '100%',
      }}
    >
      {!Loading && !isCompleted && (
        <Stack
          component={'form'}
          onSubmit={formik.handleSubmit}
          sx={{
            alignItems: 'center',
            height: '100%',
            justifyContent: { lg: 'flex-start', xs: 'space-between' },
            padding: '0rem',
          }}
        >
          <Stack>
            <Stack
              sx={{
                gap: '0.5rem',
              }}
            >
              <TitleName title="What’s your first name and email?" />
              <Typography
                sx={{
                  lineHeight: '1.056rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textAlign: 'center',
                  color: '#000000',
                  opacity: '40%',
                  fontStyle: 'italic',
                }}
              >
                This will allow us to save your timeline so you can access it later and email you helpful wedding
                planning tips.
              </Typography>
            </Stack>

            <Stack
              direction={'row'}
              sx={{
                marginTop: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 4px 4px 0px #00000033',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                padding: '0.6rem 1rem 1.2rem 1rem',
                borderRadius: '0.5rem',
              }}
            >
              <Stack
                sx={{
                  justifyContent: 'center',
                }}
              >
                <Image src={'/images/onboarding/plusGrey.svg'} width={20} height={20} alt="logo" />
              </Stack>
              <Input
                name="first_name"
                value={formik.values.first_name}
                helperText={formik.touched.first_name && formik.errors.first_name}
                error={Boolean(formik.touched.first_name && formik.errors.first_name)}
                onChange={formik.handleChange}
                id="first_name"
                placeholder="First Name"
                sx={{
                  color: 'aqua',
                  border: 'none',
                  outline: 'none',

                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '& ::placeholder': {
                    fontWeight: '600',
                    fontSize: '1rem',
                  },
                  '& .MuiInputBase-root': {
                    fontSize: '1rem !important',
                  },
                  '.MuiOutlinedInput-input': {
                    padding: '13.5px 14px',
                  },
                  marginBottom: '0.5rem',
                }}
              />
            </Stack>

            <Stack
              direction={'row'}
              sx={{
                marginTop: '0.5rem',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 4px 4px 0px #00000033',
                padding: '0.6rem 1rem 1rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(0, 0, 0, 0.04)',
              }}
            >
              <Stack
                sx={{
                  height: '3.5rem',
                  justifyContent: 'center',
                }}
              >
                <Image src={'/images/onboarding/plusGrey.svg'} width={20} height={20} alt="logo" />
              </Stack>
              <Input
                name="fiance_first_name"
                value={formik.values.fiance_first_name}
                helperText={formik.touched.fiance_first_name && formik.errors.fiance_first_name}
                error={Boolean(formik.touched.fiance_first_name && formik.errors.fiance_first_name)}
                onChange={formik.handleChange}
                id="fiance_first_name"
                placeholder="Your Fiancé(e)’s First Name"
                sx={{
                  color: 'aqua',
                  border: 'none',
                  outline: 'none',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '& ::placeholder': {
                    fontWeight: '600',
                    fontSize: '1rem',
                  },
                  '& .MuiInputBase-root': {
                    fontSize: '1rem !important',
                  },
                  '.MuiOutlinedInput-input': {
                    padding: '13.5px 14px',
                  },
                  marginBottom: '0.5rem',
                }}
              />
            </Stack>

            <Stack
              direction={'row'}
              sx={{
                marginTop: '0.5rem',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 4px 4px 0px #00000033',
                padding: '0.6rem 1rem 1rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(0, 0, 0, 0.04)',
              }}
            >
              <Stack
                sx={{
                  height: '3.5rem',
                  justifyContent: 'center',
                  marginTop: '0.05rem',
                }}
              >
                <Image src={'/images/onboarding/plusGrey.svg'} width={20} height={20} alt="logo" />
              </Stack>
              <Input
                name="email"
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email ? String(formik.errors.email) : ''}
                error={Boolean(formik.touched.email && formik.errors.email)}
                onChange={formik.handleChange}
                id="email"
                placeholder="Email Address"
                sx={{
                  color: 'aqua',
                  border: 'none',
                  outline: 'none',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '& ::placeholder': {
                    fontWeight: '600',
                    fontSize: '1rem',
                  },
                  '& .MuiInputBase-root': {
                    fontSize: '1rem !important',
                  },
                  '.MuiOutlinedInput-input': {
                    padding: '13.5px 14px',
                  },
                  marginBottom: '0.5rem',
                }}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              marginTop: { lg: '1.69rem', xs: '2rem' },
              marginBottom: { lg: '0rem', xs: '2.75rem' },
              width: '100%',
            }}
          >
            {emailAlreadyExit && (
              <Stack
                sx={{
                  textAlign: 'center',
                  marginBottom: '27px',
                }}
              >
                <CustomText
                  text="Hello again, returning user!"
                  sx={{
                    fontSize: '0.875rem;',
                    color: '#2F3C4E',
                    lineHeight: 'normal',
                    fontWeight: '700',
                    fontStyle: 'italic',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.875rem;',
                    color: '#00CAA5',
                    lineHeight: 'normal',
                    fontWeight: '700',
                    fontStyle: 'italic',
                    span: {
                      color: '#2F3C4E',
                      borderBottom: '1px solid #2F3C4E',
                    },
                  }}
                >
                  It looks like you have an account with us. Please{' '}
                  <Link href={LOGIN_URL}>
                    <span> log in</span>
                  </Link>{' '}
                  to continue
                </Typography>
              </Stack>
            )}

            <Button
              className="flex justify-center items-center xl:h-10 cursor-pointer rounded-lg w-full py-7 bg-[#00CAA599!important] h-[68px]"
              type="submit"
              id="next-btn"
              disabled={Loading}
            >
              <div className="flex justify-center items-center font-semibold px-8 py-2">
                <ShowAppLoaderOrContent data={false} size={30} color={'#fff'}>
                  <>
                    {Loading ? (
                      <p>Loading</p>
                    ) : (
                      <>
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
                            Continue
                          </Typography>
                        </Stack>
                      </>
                    )}
                  </>
                </ShowAppLoaderOrContent>
              </div>
            </Button>
          </Stack>
        </Stack>
      )}

      {Loading && <Loader />}

      {!Loading && isCompleted && <CompleteLoading />}
    </Stack>
  );
};

export default PersonalInfo;
