import { Box, Stack, Typography } from '@mui/material';
import { USER_VERSIONS } from '@prisma/client';
import { AppLoader } from 'components/common/AppLoader';
import Link from 'components/common/Link';
import Ceremony from 'components/common/NewOnbordingComponents/ceremony';
import FirstLookResetTimelinePlace from 'components/common/NewOnbordingComponents/firstLookNewPlace';
import FirstLookResetTimeline from 'components/common/NewOnbordingComponents/firstLookResetTimeline';
import PrimaryGettingDressed from 'components/common/NewOnbordingComponents/primaryGettingDressed';
import PrimaryHairMakeup from 'components/common/NewOnbordingComponents/primaryMakeup';
import { ProgressBarWithLabel } from 'components/common/NewOnbordingComponents/progressBar';
import NewReception from 'components/common/NewOnbordingComponents/reception';
import ResetTimelineComponent from 'components/common/NewOnbordingComponents/ResetTimelineComponent';
import SecondaryGettingDressed from 'components/common/NewOnbordingComponents/secondaryGettingDressed';
import SecondaryHairMakeup from 'components/common/NewOnbordingComponents/secondaryMakeup';
import WeddingDate from 'components/common/NewOnbordingComponents/weddingdate';
import WeddingTime from 'components/common/NewOnbordingComponents/weddingTime';
import ShowAppLoaderOrContent from 'components/common/ShowAppLoaderOrContent';
import { NEW_ONBOARDING_STEPS_KEYS, PRIMARY_COUPLE_ID_KEY, SECONDARY_COUPLE_ID_KEY } from 'constants/localStorage';
import Image from 'next/image';
import { memo, useEffect, useRef, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useCoupleInfo } from 'state/useCouple';
import { errorToast } from 'utils/toast';

export function ResetTimelineLayout() {
  const coupleInfo = useCoupleInfo();

  const myRef = useRef(null);

  const [progressbar, setProgressBar] = useState(1);
  const [maxCount, setMaxCount] = useState(10);
  const [wedType, setWedType] = useState<any>();
  const [primaryCouple, setPrimaryCouple] = useState<any>();
  const [secondaryCouple, setSecondaryCouple] = useState<any>();
  const [firstLook, setFirstLookAnswer] = useState('');

  useEffect(() => {
    if (!coupleInfo.isInit && !coupleInfo.coupleInfo) {
      errorToast(coupleInfo.error?.message!);
      return;
    }

    const couples = coupleInfo.coupleInfo;
    let primaryCouple;
    let secondaryCouple;
    if (couples) {
      primaryCouple = couples.find((couple) => couple.createdBy === couple.user_id);
      secondaryCouple = couples.find((couple) => couple.createdBy !== couple.user_id);
      const setCoupleState = (couple, setState) => {
        if (couple) {
          setState({
            id: couple.id,
            version: couple.user.version,
            name: couple.user.first_name,
            image: couple?.user?.picture,
            category: couple.category.label,
            fullName: `${couple.user.first_name} ${couple.user.last_name}`,
          });
        }
      };

      setCoupleState(primaryCouple, setPrimaryCouple);
      setCoupleState(secondaryCouple, setSecondaryCouple);
    }
  }, [coupleInfo.coupleInfo, coupleInfo.isInit]);

  const nextClick = () => {
    setProgressBar(progressbar + 1);
  };

  useEffect(() => {
    if (wedType) {
      switch (wedType.primary) {
        case 'Groom':
          switch (wedType.secondary) {
            case 'Groom':
              setMaxCount(firstLook == 'No' ? 8 : 9);
              break;
            case 'Bride':
              setMaxCount(firstLook == 'No' ? 9 : 10);
              break;
          }
          break;
        case 'Bride':
          switch (wedType.secondary) {
            case 'Bride':
              setMaxCount(firstLook == 'No' ? 10 : 11);
              break;
            case 'Groom':
              setMaxCount(firstLook == 'No' ? 9 : 10);
              break;
          }
          break;
      }
    }
  }, [wedType]);

  const backClick = () => {
    if (progressbar > 1) setProgressBar(progressbar - 1);
  };

  useEffect(() => {
    setFirstLookAnswer(localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.FIRST_LOOK)!);
    if (primaryCouple && secondaryCouple) {
      setWedType({
        primary: primaryCouple.category,
        secondary: secondaryCouple.category,
      });
      localStorage.setItem(PRIMARY_COUPLE_ID_KEY, primaryCouple.id);
      localStorage.setItem(SECONDARY_COUPLE_ID_KEY, secondaryCouple.id);
    }
  }, [primaryCouple, secondaryCouple, progressbar]);

  const getCurrentStepComponent = () => {
    if (wedType) {
      if (wedType.primary == 'Groom' && wedType.secondary == 'Groom') {
        switch (progressbar) {
          case 1:
            return <WeddingDate nextClick={nextClick} />;
          case 2:
            return <Ceremony nextClick={nextClick} />;
          case 3:
            return <WeddingTime nextClick={nextClick} />;
          case 4:
            return <NewReception nextClick={nextClick} />;
          case 5:
            return <PrimaryGettingDressed nextClick={nextClick} />;
          case 6:
            return <SecondaryGettingDressed nextClick={nextClick} />;
          case 7:
            return <FirstLookResetTimeline nextClick={nextClick} />;
          case 8:
            return firstLook == 'No' ? (
              <ResetTimelineComponent user_version={primaryCouple.version} />
            ) : (
              <FirstLookResetTimelinePlace nextClick={nextClick} />
            );
          case 9:
            return <ResetTimelineComponent user_version={primaryCouple.version} />;
        }
      }
      if (wedType.primary == 'Bride' && wedType.secondary == 'Bride') {
        switch (progressbar) {
          case 1:
            return <WeddingDate nextClick={nextClick} />;
          case 2:
            return <Ceremony nextClick={nextClick} />;
          case 3:
            return <WeddingTime nextClick={nextClick} />;
          case 4:
            return <NewReception nextClick={nextClick} />;
          case 5:
            return <PrimaryHairMakeup nextClick={nextClick} />;
          case 6:
            return <SecondaryHairMakeup nextClick={nextClick} />;
          case 7:
            return <PrimaryGettingDressed nextClick={nextClick} />;
          case 8:
            return <SecondaryGettingDressed nextClick={nextClick} />;
          case 9:
            return <FirstLookResetTimeline nextClick={nextClick} />;
          case 10:
            return firstLook == 'No' ? (
              <ResetTimelineComponent user_version={primaryCouple.version} />
            ) : (
              <FirstLookResetTimelinePlace nextClick={nextClick} />
            );
          case 11:
            return <ResetTimelineComponent user_version={primaryCouple.version} />;
        }
      }
      if (wedType.primary == 'Bride' && wedType.secondary == 'Groom') {
        switch (progressbar) {
          case 1:
            return <WeddingDate nextClick={nextClick} />;
          case 2:
            return <Ceremony nextClick={nextClick} />;
          case 3:
            return <WeddingTime nextClick={nextClick} />;
          case 4:
            return <NewReception nextClick={nextClick} />;
          case 5:
            return <PrimaryHairMakeup nextClick={nextClick} />;
          case 6:
            return <PrimaryGettingDressed nextClick={nextClick} />;
          case 7:
            return <SecondaryGettingDressed nextClick={nextClick} />;
          case 8:
            return <FirstLookResetTimeline nextClick={nextClick} />;
          case 9:
            return firstLook == 'No' ? (
              <ResetTimelineComponent user_version={primaryCouple.version} />
            ) : (
              <FirstLookResetTimelinePlace nextClick={nextClick} />
            );
          case 10:
            return <ResetTimelineComponent user_version={primaryCouple.version} />;
          default:
            return null;
        }
      }
      if (wedType.primary === 'Groom' && wedType.secondary === 'Bride') {
        switch (progressbar) {
          case 1:
            return <WeddingDate nextClick={nextClick} />;
          case 2:
            return <Ceremony nextClick={nextClick} />;
          case 3:
            return <WeddingTime nextClick={nextClick} />;
          case 4:
            return <NewReception nextClick={nextClick} />;
          case 5:
            return <PrimaryGettingDressed nextClick={nextClick} />;
          case 6:
            return <SecondaryHairMakeup nextClick={nextClick} />;
          case 7:
            return <SecondaryGettingDressed nextClick={nextClick} />;
          case 8:
            return <FirstLookResetTimeline nextClick={nextClick} />;
          case 9:
            return firstLook == 'No' ? (
              <ResetTimelineComponent user_version={primaryCouple.version} />
            ) : (
              <FirstLookResetTimelinePlace nextClick={nextClick} />
            );
          case 10:
            return <ResetTimelineComponent user_version={primaryCouple.version} />;
          default:
            return null;
        }
      }
    }
  };

  return (
    <>
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
                        {primaryCouple && primaryCouple.version === USER_VERSIONS.V2 ? (
                          <></>
                        ) : (
                          <BsArrowLeftShort fontSize={'25px'} onClick={backClick} />
                        )}
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
                            {progressbar}/{maxCount}
                          </span>
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack>
                      <ProgressBarWithLabel value={progressbar} max={maxCount} />
                    </Stack>
                  </>

                  <Stack
                    sx={{
                      justifyContent: 'center',
                      paddingTop: '3.188rem',
                      height: '100%',
                    }}
                  >
                    {wedType?.primary && wedType?.secondary ? getCurrentStepComponent() : <AppLoader />}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </div>
        </div>
      </ShowAppLoaderOrContent>
    </>
  );
}

export default memo(ResetTimelineLayout);
