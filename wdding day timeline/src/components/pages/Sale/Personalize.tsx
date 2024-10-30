import { Stack, Typography } from '@mui/material';
import { ICustomerPromotion } from 'interfaces/promotion.interface';
import Image from 'next/image';
import PersonalizeCard from './PersonalizeCard';

type Props = {
  text: string;
  checkoutLink: string;
  promotionCode: ICustomerPromotion | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const Personalize = ({ promotionCode, text, checkoutLink, isLoading, setIsLoading }: Props) => {
  const is_promotion_active = promotionCode && promotionCode.id !== null;
  return (
    <Stack
      sx={{
        position: 'relative',
        padding: '0px 20px',
      }}
    >
      <Stack
        sx={{
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            marginTop: { md: '65px', xs: '70px' },
            fontFamily: 'Poppins',
            fontWeight: { sm: '300', xs: '400' },
            fontSize: { md: '32px', sm: '24px', xs: '22px' },
            lineHeight: { md: '45.13px', sm: '36px', xs: '33px' },
            color: 'var(--black)',
            letterSpacing: '2%',
            textAlign: 'center',
            width: { md: '100%', sm: '487px', xs: '100%' },
            span: {
              fontWeight: '700',
              color: 'var(--purple)',
            },
          }}
        >
          Your <span>Personalized</span> Wedding Day Timeline is <span>Ready!</span>
        </Typography>
        <Typography
          sx={{
            marginTop: '9.99px',
            fontFamily: 'Poppins',
            fontWeight: '400',
            fontSize: { md: '14px', xs: '12px' },
            lineHeight: { md: '23.52px', xs: '22.2px' },
            color: 'var(--black)',
            textAlign: 'center',
            width: { md: '100%', sm: '384px', xs: '100%' },
            letterSpacing: { sm: 'normal', xs: '2.08px' },
            span: {
              fontWeight: { sm: '700', xs: '600' },
            },
          }}
        >
          You’re just a click away from a stress-free and <span> perfectly planned</span> wedding!
        </Typography>
      </Stack>

      <Stack
        sx={{
          alignItems: 'center',
          marginTop: { md: '55.5px', sm: '36.16px', xs: '59.32px' },
        }}
      >
        {is_promotion_active && (
          <Stack sx={{ width: { sm: '430px', xs: '100%' } }}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              sx={{
                backgroundColor: '#F1395A !important',
                ':hover': {
                  backgroundColor: '#F1395A',
                },
                padding: '10.32px 0px',
                gap: '11.93px',
                width: '100%',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stack
                sx={{
                  width: '20.49px',
                  height: '20.46px',
                  position: 'relative',
                  img: {
                    position: 'absolute',
                    width: 'auto',
                    height: 'auto',
                  },
                }}
              >
                <Image priority alt="complex" src={'/images/dashboard/clockWhite.svg'} fill />
              </Stack>

              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '21px',
                  color: 'var(--white)',
                  textAlign: 'center',
                  span: {
                    fontWeight: '700',
                  },
                }}
              >
                {promotionCode.code.replace('OFF', '')}% OFF! This offer ends in <span> {text}</span>
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>

      <PersonalizeCard
        promotionCode={promotionCode}
        checkoutLink={checkoutLink}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <Stack
        sx={{
          position: 'absolute',
          width: { sm: '38.69px', xs: '26.61px' },
          height: { md: '33.58px', xs: '23.09px' },
          bottom: { md: '83px', sm: '210px', xs: '110px' },
          left: { sm: '148.55px', xs: '0px' },
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '420px',
          },
        }}
      >
        <Image priority alt="complex" src="/images/dashboard/personalizedLeft.svg" fill sizes="100%" />
      </Stack>

      <Stack
        sx={{
          position: 'absolute',
          width: { sm: '57.51px', xs: '39.54px' },
          height: { sm: '60.32px', xs: '41.48px' },
          top: { md: '165px', sm: '160px', xs: '166px' },
          right: { lg: '98.02px', sm: '18.02px', xs: '0px' },
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '420px',
          },
        }}
      >
        <Image priority alt="complex" src="/images/dashboard/personalizedRight.svg" fill sizes="100%" />
      </Stack>
    </Stack>
  );
};

export default Personalize;
