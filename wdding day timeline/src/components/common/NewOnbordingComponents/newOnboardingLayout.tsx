// import Logo from '../Logo';
import { Box, Stack, Typography } from '@mui/material';
import { NEW_ACTIVE_ONBOARDING_STEP_KEY, NEW_ONBOARDING_STEPS_KEYS } from 'constants/localStorage';
import Image from 'next/image';
import { memo, useEffect, useRef, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import Link from '../Link';
import ShowAppLoaderOrContent from '../ShowAppLoaderOrContent';
import Ceremony from './ceremony';
import CoupleTypeSelection from './CoupleTypeSelection';
import FirstLookNew from './firstLookNew';
import FirstLookNewPlace from './firstLookNewPlace';
import PersonalInfo from './personalInfo';
import PrimaryGettingDressed from './primaryGettingDressed';
import PrimaryHairMakeup from './primaryMakeup';
import { ProgressBarWithLabel } from './progressBar';
import NewReception from './reception';
import SecondaryGettingDressed from './secondaryGettingDressed';
import SecondaryHairMakeup from './secondaryMakeup';
import WeddingDate from './weddingdate';
import WeddingTime from './weddingTime';
import Welcome from './welcome';

export function NewOnboardingLayout() {
  const myRef = useRef(null);
  const [hideProgressbar, setHideProgressbar] = useState(false);

  const [maxCount, setMaxCount] = useState(10);
  const [wedType, setWedType] = useState<any>();
  const [firstLook, setFirstLookAnswer] = useState('');

  const activeStep = localStorage.getItem(NEW_ACTIVE_ONBOARDING_STEP_KEY);
  const [progressbar, setProgressBar] = useState<number>(Number(activeStep) || 1);

  const nextClick = () => {
    const updatedProgress = progressbar + 1;
    setProgressBar(updatedProgress);
    localStorage.setItem(NEW_ACTIVE_ONBOARDING_STEP_KEY, updatedProgress.toString());
  };

  const backClick = () => {
    if (progressbar > 2) setProgressBar(progressbar - 1);
  };

  useEffect(() => {
    const data = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_TYPE);
    if (data) {
      setWedType(JSON.parse(data));
    }
    setFirstLookAnswer(localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.FIRST_LOOK)!);
  }, [progressbar]);

  useEffect(() => {
    if (wedType) {
      if (wedType.primary == 'Groom' && wedType.secondary == 'Groom') {
        setMaxCount(10);
      }
      if (wedType.primary == 'Bride' && wedType.secondary == 'Bride') {
        setMaxCount(12);
      }
      if (wedType.primary == 'Bride' && wedType.secondary == 'Groom') {
        setMaxCount(11);
      }
      if (wedType.primary == 'Groom' && wedType.secondary == 'Bride') {
        setMaxCount(11);
      }
    }
  }, [wedType]);

  useEffect(() => {
    if (wedType) {
      if (firstLook == 'No' && wedType.primary == 'Groom' && wedType.secondary == 'Groom') {
        setMaxCount(9);
      }
      if (firstLook == 'Yes' && wedType.primary == 'Groom' && wedType.secondary == 'Groom') {
        setMaxCount(10);
      }
      if (firstLook == 'No' && wedType.primary == 'Bride' && wedType.secondary == 'Bride') {
        setMaxCount(11);
      }
      if (firstLook == 'Yes' && wedType.primary == 'Bride' && wedType.secondary == 'Bride') {
        setMaxCount(12);
      }
      if (firstLook == 'No' && wedType.primary == 'Groom' && wedType.secondary == 'Bride') {
        setMaxCount(10);
      }
      if (firstLook == 'Yes' && wedType.primary == 'Groom' && wedType.secondary == 'Bride') {
        setMaxCount(11);
      }
      if (firstLook == 'No' && wedType.primary == 'Bride' && wedType.secondary == 'Groom') {
        setMaxCount(10);
      }
      if (firstLook == 'Yes' && wedType.primary == 'Bride' && wedType.secondary == 'Groom') {
        setMaxCount(11);
      }
    }
  }, [firstLook]);

  const getCurrentStepComponent = () => {
    if (wedType) {
      if (wedType.primary == 'Groom' && wedType.secondary == 'Groom') {
        switch (progressbar) {
          case 1:
            return <Welcome nextClick={nextClick} />;
          case 2:
            return <CoupleTypeSelection nextClick={nextClick} />;
          case 3:
            return <WeddingDate nextClick={nextClick} />;
          case 4:
            return <Ceremony nextClick={nextClick} />;
          case 5:
            return <WeddingTime nextClick={nextClick} />;
          case 6:
            return <NewReception nextClick={nextClick} />;
          case 7:
            return <PrimaryGettingDressed nextClick={nextClick} />;
          case 8:
            return <SecondaryGettingDressed nextClick={nextClick} />;
          case 9:
            return <FirstLookNew nextClick={nextClick} />;
          case 10:
            return firstLook == 'No' ? (
              <PersonalInfo setHideProgressbar={setHideProgressbar} />
            ) : (
              <FirstLookNewPlace nextClick={nextClick} />
            );
          case 11:
            return <PersonalInfo setHideProgressbar={setHideProgressbar} />;
          default:
            return null;
        }
      }
      if (wedType.primary == 'Bride' && wedType.secondary == 'Bride') {
        switch (progressbar) {
          case 1:
            return <Welcome nextClick={nextClick} />;
          case 2:
            return <CoupleTypeSelection nextClick={nextClick} />;
          case 3:
            return <WeddingDate nextClick={nextClick} />;
          case 4:
            return <Ceremony nextClick={nextClick} />;
          case 5:
            return <WeddingTime nextClick={nextClick} />;
          case 6:
            return <NewReception nextClick={nextClick} />;
          case 7:
            return <PrimaryHairMakeup nextClick={nextClick} />;
          case 8:
            return <SecondaryHairMakeup nextClick={nextClick} />;
          case 9:
            return <PrimaryGettingDressed nextClick={nextClick} />;
          case 10:
            return <SecondaryGettingDressed nextClick={nextClick} />;
          case 11:
            return <FirstLookNew nextClick={nextClick} />;
          case 12:
            return firstLook == 'No' ? (
              <PersonalInfo setHideProgressbar={setHideProgressbar} />
            ) : (
              <FirstLookNewPlace nextClick={nextClick} />
            );
          case 13:
            return <PersonalInfo setHideProgressbar={setHideProgressbar} />;
          default:
            return null;
        }
      }
      if (wedType.primary == 'Bride' && wedType.secondary == 'Groom') {
        switch (progressbar) {
          case 1:
            return <Welcome nextClick={nextClick} />;
          case 2:
            return <CoupleTypeSelection nextClick={nextClick} />;
          case 3:
            return <WeddingDate nextClick={nextClick} />;
          case 4:
            return <Ceremony nextClick={nextClick} />;
          case 5:
            return <WeddingTime nextClick={nextClick} />;
          case 6:
            return <NewReception nextClick={nextClick} />;
          case 7:
            return <PrimaryHairMakeup nextClick={nextClick} />;
          case 8:
            return <PrimaryGettingDressed nextClick={nextClick} />;
          case 9:
            return <SecondaryGettingDressed nextClick={nextClick} />;
          case 10:
            return <FirstLookNew nextClick={nextClick} />;
          case 11:
            return firstLook == 'No' ? (
              <PersonalInfo setHideProgressbar={setHideProgressbar} />
            ) : (
              <FirstLookNewPlace nextClick={nextClick} />
            );
          case 12:
            return <PersonalInfo setHideProgressbar={setHideProgressbar} />;
          default:
            return null;
        }
      }
      if (wedType.primary === 'Groom' && wedType.secondary === 'Bride') {
        switch (progressbar) {
          case 1:
            return <Welcome nextClick={nextClick} />;
          case 2:
            return <CoupleTypeSelection nextClick={nextClick} />;
          case 3:
            return <WeddingDate nextClick={nextClick} />;
          case 4:
            return <Ceremony nextClick={nextClick} />;
          case 5:
            return <WeddingTime nextClick={nextClick} />;
          case 6:
            return <NewReception nextClick={nextClick} />;
          case 7:
            return <PrimaryGettingDressed nextClick={nextClick} />;
          case 8:
            return <SecondaryHairMakeup nextClick={nextClick} />;
          case 9:
            return <SecondaryGettingDressed nextClick={nextClick} />;
          case 10:
            return <FirstLookNew nextClick={nextClick} />;
          case 11:
            return firstLook == 'No' ? (
              <PersonalInfo setHideProgressbar={setHideProgressbar} />
            ) : (
              <FirstLookNewPlace nextClick={nextClick} />
            );
          case 12:
            return <PersonalInfo setHideProgressbar={setHideProgressbar} />;
          default:
            return null;
        }
      }
    } else {
      switch (progressbar) {
        case 1:
          return <Welcome nextClick={nextClick} />;
        case 2:
          return <CoupleTypeSelection nextClick={nextClick} />;
        default:
          return null;
      }
    }
  };

  return (
    <ShowAppLoaderOrContent data={false} size={40}>
      <div className="overflow-y-auto w-full bg-grey-200">
        <div ref={myRef}>
          <Stack
            sx={{
              alignItems: 'center',
              minHeight: '100vh',
              maxHeight: 'auto',
              backgroundColor: { lg: '#F2F0F5', xs: '#ffffff' },
              position: 'relative',
            }}
          >
            <Stack
              sx={{
                position: 'absolute',
                top: '3.625rem',
                left: '7.5rem',
                display: { lg: 'flex', xs: 'none' },
              }}
            >
              <Stack
                sx={{
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Link href={'/'}>
                  <Stack
                    sx={{
                      position: 'relative',
                      width: '10rem',
                      height: '1.625rem',
                      img: {
                        position: 'absolute',
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%',
                      },
                    }}
                  >
                    <Image priority src="/images/logo-pic.png" alt={'icon'} fill />
                  </Stack>
                </Link>
              </Stack>
            </Stack>

            <Stack
              sx={{
                width: '375px',
                minWidth: '320px',
                paddingTop: { lg: '4.5rem', xs: '3.625rem' },
                minHeight: '100vh',
                maxHeight: '100%',
                backgroundColor: '#ffffff',
                paddingBottom: { lg: '2rem', xs: '0rem' },
              }}
            >
              <Stack
                sx={{
                  width: '100%',
                  padding: '0rem 1rem 0rem 1rem',
                  height: '100%',
                }}
              >
                <Stack
                  sx={{
                    alignItems: 'center',
                    display: { lg: 'none', xs: 'flex' },
                  }}
                >
                  <Link href={'/'}>
                    <Stack
                      sx={{
                        position: 'relative',
                        width: '10rem',
                        height: '1.5rem',
                        img: {
                          position: 'absolute',
                          cursor: 'pointer',
                          width: '100%',
                          height: '100%',
                        },
                      }}
                    >
                      <Image priority src="/images/logo-pic.png" alt={'icon'} fill />
                    </Stack>
                  </Link>
                </Stack>

                {progressbar > 1 && !hideProgressbar ? (
                  <>
                    <Stack
                      direction={'row'}
                      sx={{
                        justifyContent: 'space-between',
                        paddingRight: '0.5rem',
                        marginTop: '0.813rem',
                      }}
                    >
                      <Stack
                        sx={{
                          cursor: 'pointer',
                        }}
                      >
                        <BsArrowLeftShort fontSize={'25px'} onClick={backClick} />
                      </Stack>

                      <Box>
                        <Typography
                          variant="body2"
                          color="#00CAA5"
                          sx={{
                            fontSize: '14px',
                            fontWeight: 600,
                            span: {
                              color: '##00CAA5',
                              opacity: '60%',
                            },
                          }}
                        >
                          <span style={{ fontSize: '12px' }}>
                            {progressbar - 1}/{maxCount}
                          </span>
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack>
                      <ProgressBarWithLabel value={progressbar - 1} max={maxCount} />
                    </Stack>
                  </>
                ) : null}

                <Stack
                  sx={{
                    justifyContent: 'center',
                    paddingTop: '3.188rem',
                    height: '100%',
                  }}
                >
                  {getCurrentStepComponent()}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    </ShowAppLoaderOrContent>
  );
}

export default memo(NewOnboardingLayout);
