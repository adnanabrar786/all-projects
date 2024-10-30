import { Box, Stack, Typography } from '@mui/material';
import ArrowGreenButton from 'components/common/ArrowGreenButton/ArrowGreenButton';
import Link from 'components/common/Link';
import { weddingPlaningTimeLIne } from 'constants/constants';
import Image from 'next/image';
import FeatureCard from './FeatureCard';

type Props = {
  price: string;
  checkoutLink: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export default function WeddingPlan({ price, checkoutLink, isLoading, setIsLoading }: Props) {
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: { md: '145px', sm: '140px', xs: '100px' },
        position: 'relative',
        padding: { md: '0px 0px', sm: '0px 57px', xs: '0px 17px' },
      }}
    >
      <Stack
        sx={{
          position: 'relative',
          width: { md: '63.92px', sm: '53px', xs: '47px' },
          height: { md: '95.34px', sm: '75px', xs: '71px' },
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
          },
        }}
      >
        <Image priority alt="pic" src="/images/dashboard/sixStar.svg" fill />
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
          width: { md: '700px', xs: '100%' },
          textAlign: 'center',
          span: {
            fontWeight: '700',
            color: 'var(--purple)',
          },
        }}
      >
        Our <span>App</span> Makes Your Wedding Planning <span>Effortless</span> And
        <span> Stress-Free!</span>
      </Typography>
      <Stack
        sx={{
          position: 'relative',
          alignItems: 'center',
          maxWidth: '808px',
          width: { lg: '808px', xs: '100%' },
        }}
      >
        <Stack
          sx={{
            position: 'relative',
            width: '204px',
            height: '444px',
            marginRight: { sm: '0px', xs: '10px' },
            marginTop: { sm: '3.75rem', lg: '4.7rem' },
            img: {
              width: '100%',
              height: '100%',
              position: 'absolute',
            },
          }}
        >
          <Image priority alt="mobile" src="/images/mobile.png" fill />
        </Stack>

        <Stack
          sx={{
            position: 'absolute',
            width: { sm: '44.95px', xs: '27px' },
            height: { sm: '50.78px', xs: '30px' },
            top: { lg: '100px', sm: '80px', xs: '80px' },
            right: { lg: '-20px', sm: '50px', xs: '20px' },
            img: {
              width: '100%',
              height: '100%',
              position: 'absolute',
            },
          }}
        >
          <Image priority alt="complex" src="/images/dashboard/spring.svg" fill sizes="100%" quality={100} />
        </Stack>
      </Stack>

      <Stack
        sx={{
          gap: { md: '35px', xs: '45px' },
          maxWidth: '808px',
          marginTop: '50px',
        }}
      >
        {weddingPlaningTimeLIne.map((val, index) => (
          <FeatureCard
            src={val.img}
            title={val.title}
            text={val.text}
            key={index}
            textTwo={val.textTwo}
            bolText={val.bolText}
          />
        ))}
      </Stack>
      <Box
        sx={{
          marginTop: { md: '60px', sm: '80px', xs: '70px' },
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
            sx={{
              width: '345px',
            }}
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
          width: { sm: '85.62px', xs: '58.87px' },
          height: { sm: '76.79px', xs: '52.8px' },
          bottom: { md: '105px', sm: '60px', xs: '265px' },
          right: { sm: '20.11px', xs: '6.7px' },
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
          },
        }}
      >
        <Image priority alt="complex" src="/images/dashboard/circleCross.svg" fill sizes="100%" />
      </Stack>

      <Stack
        sx={{
          position: 'absolute',
          width: '119.58px',
          height: '146.59px',
          bottom: { lg: '620px', sm: '750px', xs: '1220px' },
          left: { sm: '0px', xs: '-50px' },
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
          },
        }}
      >
        <Image priority alt="complex" src="/images/dashboard/drops.svg" fill sizes="100%" />
      </Stack>
    </Stack>
  );
}
