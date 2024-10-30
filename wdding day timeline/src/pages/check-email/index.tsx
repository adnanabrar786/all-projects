import { Grid, Stack } from '@mui/material';
import Logo from 'components/common/Logo';
import PasswordInfo from 'components/pages/login/PasswordInfo';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { LOGIN_URL } from 'routes';

export default function Page({ email }: { email: string }) {
  return (
    <Stack
      sx={{
        backgroundColor: '#F5FCFF',
        height: { lg: '100vh', xs: 'auto' },
        px: { lg: '5.63rem', md: '3.13rem', xs: '1rem' },
        pb: { lg: '7.81rem', xs: 'auto' },
      }}
    >
      <Stack
        sx={{
          alignItems: 'center',
          pt: '3.69rem',
          pb: '2.5rem',
        }}
      >
        <Logo />
      </Stack>

      <Grid
        container
        sx={{
          backgroundColor: { sm: '#ffffff', xs: 'none' },
          height: '100%',
          borderRadius: '0.75rem',
          alignItems: 'center',
          justifyContent: { lg: 'space-between', md: 'space-around', xs: 'center' },
          padding: {
            lg: '5rem 5.88rem 4.94rem 2.63rem',
            md: '2.81rem 0.5rem 2.81rem 0rem',
            sm: '0.88rem 0rem 1.88rem 0rem',
            xs: '0.88rem 0rem 1.88rem 0rem',
          },
          width: '100%',
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack
            sx={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
            }}
          >
            <Stack
              sx={{
                position: 'relative',
                width: { lg: '500px', md: '431px', xs: '205px' },
                height: { lg: '435px', md: '387.629px', xs: '182.708px' },
                img: {
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                },
              }}
            >
              <Image src={'/images/login-pic.png'} fill alt="Login" />
            </Stack>
          </Stack>
        </Grid>
        <PasswordInfo email={email} />
      </Grid>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps<{ email: string }> = async (context) => {
  const email = context.query.email;

  if (email) {
    return {
      props: {
        email: `${email}`,
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: LOGIN_URL,
    },
  };
};
