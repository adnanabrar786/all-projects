import { Stack } from '@mui/material';
import Image from 'next/image';
import CustomText from '../home/NewDashboard/CustomText';

const FooterSale = () => {
  return (
    <Stack
      sx={{
        backgroundColor: '#222121',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Stack
        sx={{
          padding: { md: '72.45px 89px 0px 89px', sm: '63px 80px 0px 80px', xs: '80px 0px 0px 0px' },
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            position: 'relative',
            width: { md: '201px', sm: '195px', xs: '201px' },
            height: { md: '32px', sm: '31.68px', xs: '32px' },
            img: {
              width: '100%',
              height: '100%',
              position: 'absolute',
            },
          }}
        >
          <Image priority alt="complex" src={'/images/dashboard/logoWhite.svg'} sizes="100%" fill />
        </Stack>
        <CustomText
          sx={{
            color: 'var(--white)',
            lineHeight: '30px',
            fontSize: { md: '14px', xs: '12px' },
            fontStyle: 'italic',
            marginTop: { md: '30.94px', sm: '40px', xs: '50px' },
            width: { md: '685px', sm: '450px', xs: '100%' },
            textAlign: 'center',
            padding: { sm: '0px', xs: '0px 25px' },
          }}
          text="The only personalized wedding timeline tool powered by AI that can give you an on-demand, minute-by-minute timeline in less than 5 minutes."
        />
        <Stack
          direction={'column'}
          sx={{
            width: '100%',
            borderTop: '1px solid var(--white)',
            marginTop: '50px',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '21.66px',
            gap: '30px',
          }}
        ></Stack>
      </Stack>
      <Stack
        sx={{
          width: '100%',
          height: '40px',
          backgroundColor: 'var(--white)',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '63.99px',
        }}
      >
        <CustomText
          sx={{
            cursor: 'pointer',
            color: 'var(--black)',
            lineHeight: '18px',
            fontSize: '12px',
            textAlign: 'center',
            width: '100%',
            letterSpacing: '5%',
          }}
          text="© 2024 Wedding Day Timeline"
        />
      </Stack>
    </Stack>
  );
};

export default FooterSale;
