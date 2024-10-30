import { Box, Stack } from '@mui/material';
import { playball } from 'components/common/fontFamilyMUI/fontFamilyMUI';
import Image from 'next/image';
import CustomText from '../home/NewDashboard/CustomText';
import moment from 'moment';
import { NEW_ONBOARDING_STEPS_KEYS } from 'constants/localStorage';

const WeddingCard = () => {
  const info = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.PERSONAL_INFO);
  const personalInfo = JSON.parse(info ? info : JSON.stringify({}));
  const date = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_DATE);

  const getWeddingDate = () => {
    if (Number(date)) {
      const updatedDate = Number(date) * 1000;
      const data = moment(updatedDate).format('YYYY-MM-DD');
      if (data) {
        return moment(data).format('dddd, MMMM DD, yyyy');
      }
    }
    return '';
  };

  return (
    <Stack
      sx={{
        marginTop: '140px',
        position: 'relative',
        marginBottom: '29px',
      }}
    >
      <Stack
        sx={{
          alignItems: 'Center',
          position: 'relative',
        }}
      >
        <Stack
          sx={{
            position: 'relative',
            width: { sm: '362.78px', xs: '287.82px' },
            height: { sm: '470px', xs: '372.89px' },
            backgroundColor: 'var(--white)',
            zIndex: '100',
            img: {
              width: '100%',
              height: '100%',
              position: 'absolute',
            },
          }}
        >
          <Image priority alt="complex" src="/images/dashboard/frame.svg" fill sizes="100%" quality={100} />
        </Stack>
        <Stack
          sx={{
            position: 'absolute',
            zIndex: '100',
            width: { sm: '362.78px', xs: '288px' },
            height: { sm: '470px', xs: '372.89px' },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CustomText
            sx={{
              fontFamily: playball.style.fontFamily,
              fontSize: '16px',
              lineHeight: '20px',
              color: 'var(--purple)',
            }}
            text="The Wedding Day Timeline of"
          />
          <Stack
            direction={'row'}
            sx={{
              gap: '8px',
              marginTop: '8px',
            }}
          >
            <CustomText
              sx={{
                fontFamily: playball.style.fontFamily,
                fontSize: '24px',
                lineHeight: '30px',
                color: 'var(--purple)',
                textAlign: 'center',
                padding: '0px 4px',
              }}
              text={personalInfo?.name}
            />
            <CustomText
              sx={{
                fontFamily: playball.style.fontFamily,
                fontSize: '20px',
                lineHeight: '30px',
                color: 'var(--purple)',
              }}
              text="&"
            />

            <CustomText
              sx={{
                fontFamily: playball.style.fontFamily,
                fontSize: '24px',
                lineHeight: '30px',
                color: 'var(--purple)',
                textAlign: 'center',
                padding: '0px 4px',
              }}
              text={personalInfo?.fiance_first_name}
            />
          </Stack>
          <Stack
            sx={{
              alignItems: 'center',
              marginTop: '7.93px',
            }}
          >
            <Image priority alt="pic" src="/images/dashboard/flower.svg" width={85} height={35} />
          </Stack>
          <CustomText
            sx={{
              marginTop: '8px',
              fontSize: '11px',
              lineHeight: '16.5px',
              color: 'var(--purple)',
            }}
            text={getWeddingDate()}
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#EEEBF1',
            width: { md: '893px', sm: '100%', xs: '345px' },
            height: { sm: '118px', xs: '90px' },
            position: 'absolute',
            bottom: '-29px',
          }}
        />
      </Stack>

      <Stack
        sx={{
          position: 'absolute',
          width: { sm: '100.04px', xs: '56.39px' },
          height: '96px',
          bottom: { md: '120px', sm: '150px', xs: '120px' },
          left: '0px',
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
          },
        }}
      >
        <Image priority alt="complex" src="/images/dashboard/weddingCardLeft.svg" fill sizes="100%" />
      </Stack>
      <Stack
        sx={{
          display: { sm: 'flex', xs: 'none' },
          position: 'absolute',
          width: '107.76px',
          height: '75.77px',
          top: '23px',
          right: '0px',
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '420px',
          },
        }}
      >
        <Image priority alt="complex" src="/images/dashboard/weddingCardRight.svg" fill sizes="100%" />
      </Stack>

      <Stack
        sx={{
          display: { sm: 'none', xs: 'flex' },
          position: 'absolute',
          width: '64.09px',
          height: '52.1px',
          top: { md: '23px' },
          right: '0px',
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '420px',
          },
        }}
      >
        <Image priority alt="complex" src="/images/dashboard/weddingCardRightMobile.svg" fill sizes="100%" />
      </Stack>
    </Stack>
  );
};

export default WeddingCard;
