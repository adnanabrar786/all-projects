import { Box, Stack, Typography } from '@mui/material';
import ArrowGreenButton from 'components/common/ArrowGreenButton/ArrowGreenButton';
import Link from 'components/common/Link';
import { featureTimeLIne } from 'constants/constants';
import Image from 'next/image';
import FeatureCard from './FeatureCard';

type Props = {
  price: string;
  checkoutLink: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export default function Feature({ price, checkoutLink, isLoading, setIsLoading }: Props) {
  return (
    <Stack
      sx={{
        gap: '50px',
        marginTop: { md: '145px', sm: '140px', xs: '100px' },
        position: 'relative',
        paddingBottom: { md: '145.71px', sm: '200px', xs: '187px' },
      }}
    >
      <Stack
        sx={{
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            position: 'relative',
            width: { md: '73.85px', sm: '53px', xs: '47px' },
            height: { md: '97.08px', sm: '75px', xs: '71px' },
            img: {
              width: '100%',
              height: '100%',
              position: 'absolute',
            },
          }}
        >
          <Image priority alt="pic" src="/images/dashboard/feature.svg" fill />
        </Stack>

        <Typography
          sx={{
            marginTop: { md: '45.66px', xs: '40px' },
            fontFamily: 'Poppins',
            fontWeight: '400',
            fontSize: { md: '32px', sm: '24px', xs: '22px' },
            lineHeight: { md: '45.13px', sm: '36px', xs: '33px' },
            color: 'var(--black)',
            letterSpacing: '2%',
            textAlign: 'center',
            span: {
              fontWeight: '700',
              color: 'var(--purple)',
            },
          }}
        >
          <span>Features</span> that make Wedding Planning <span>Made Easy!</span>
        </Typography>
      </Stack>
      <Stack
        sx={{
          gap: { md: '35px', xs: '45px' },
          padding: { md: '0px 0px', sm: '0px 57px', xs: '0px 17px' },
        }}
      >
        {featureTimeLIne.map((val, index) => (
          <FeatureCard src={val.img} title={val.title} text={val.text} key={index} />
        ))}
      </Stack>
      <Box
        sx={{
          marginTop: { md: '36px', sm: '58.61px', xs: '50px' },
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Link href={checkoutLink} target="_self">
          <ArrowGreenButton
            onClick={() => {
              setIsLoading(true);
            }}
            loaderColor={'#ffffff'}
            loading={isLoading}
            sx={{ width: '345.82px' }}
            sxImage={{
              width: '14.75px',
              height: '9.83px',
            }}
            src={'/images/dashboard/whiteRightArrow.svg'}
            text=" Get My Timeline - Just"
            textTwo={price}
          />
        </Link>
      </Box>

      <Stack
        sx={{
          position: 'absolute',
          bottom: '0px',
          width: '111.84px',
          height: '75.18px',
          top: { md: '375px', sm: '-198px', xs: '165px' },
          right: { md: '34px', sm: '85px', xs: '0px' },
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '420px',
          },
        }}
      >
        <Image priority alt="complex" src="/images/dashboard/starDot.svg" fill sizes="100%" />
      </Stack>

      <Stack
        sx={{
          display: { sm: 'flex', xs: 'none' },
          position: 'absolute',
          width: { md: '105.22px', xs: '80px' },
          height: '105.22px',
          top: { md: '-70px', xs: '-690px' },
          left: { md: '77.78px', xs: '0px' },
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
          },
        }}
      >
        <Image priority alt="complex" src="/images/dashboard/featureTopLeft.svg" fill sizes="100%" />
      </Stack>
      <Stack
        sx={{
          position: 'absolute',
          bottom: { md: '0px', xs: '-32px' },
          left: '-50px',
          width: { md: '476px', xs: '263px' },
          height: '223px',
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
          },
        }}
      >
        <Image priority alt="pic" src="/images/dashboard/featureBg.svg" fill />
      </Stack>
    </Stack>
  );
}
