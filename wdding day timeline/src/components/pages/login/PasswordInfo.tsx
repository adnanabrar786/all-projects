import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import CustomText from 'components/pages/home/NewDashboard/CustomText';
import { paymentSuccessfulDetails } from 'constants/constants';
import Link from 'next/link';
import { LOGIN_URL } from 'routes';
import { ResendTemporaryPassword } from 'services/auth.service';
import { errorToast, successToast } from 'utils/toast';

const PasswordInfo = ({ email }: { email: string }) => {
  const resendTemporaryPassword = async () => {
    try {
      await ResendTemporaryPassword(email);
      successToast('Temporary password sent!');
    } catch (error) {
      const err = error as any;
      if (err.response.data.data && err.response.data.data.message) {
        errorToast(err.response.data!.data.message);
        return;
      }
      errorToast('Cannot sent temporary password at the moment. Please try again later.');
    }
  };

  return (
    <Grid item xs={12} md={5}>
      <Stack
        sx={{
          boxShadow: '0px 3px 18px 0px rgba(0, 0, 0, 0.06)',
          borderRadius: '0.75rem',
          height: '100%',
          padding: { lg: '4.87rem 3.25rem 4rem 4.87rem', xs: '1.5rem 0.69rem 1.56rem 0.5rem' },
          marginTop: { lg: '0px', sm: '2.96rem', xs: '3.96rem' },
          width: { md: '100%', xs: '21.9rem' },
          marginX: { md: '0', xs: 'auto' },
          backgroundColor: '#ffffff',
        }}
      >
        <CustomText
          text="Thank You! Your Payment was Successful 🎉"
          sx={{
            fontFamily: 'Poppins',
            color: 'rgba(0, 0, 0, 0.80)',
            fontSize: '0.875rem',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
          }}
        />

        <Stack
          sx={{
            marginTop: '1rem',
          }}
        >
          <CustomText
            text="We’re thrilled to have you on board. Your timeline is now ready to be personalized."
            sx={{
              color: '#333',
              fontSize: '0.75rem',
              lineHeight: 'normal',
              fontStyle: 'normal',
            }}
          />
        </Stack>

        <Stack
          sx={{
            marginTop: '1rem',
          }}
        >
          <CustomText
            text="Next Steps:"
            sx={{
              fontFamily: 'Poppins',
              color: '#333',
              fontSize: '0.78rem',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: 'normal',
            }}
          />

          {paymentSuccessfulDetails.map((val, index) => (
            <Stack
              direction={'row'}
              sx={{
                gap: '0.24rem',
                marginTop: '1rem',
              }}
            >
              <Stack
                sx={{
                  marginTop: '0.5rem',
                }}
              >
                <Box
                  sx={{
                    width: '4px',
                    height: '4px',
                    backgroundColor: '#000',
                    borderRadius: '50%',
                  }}
                />
              </Stack>
              <Stack>
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    color: '#333',
                    fontSize: '0.78rem',
                    lineHeight: 'normal',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    span: {
                      color: 'rgba(0, 0, 0, 0.80)',
                      fontWeight: '700',
                    },
                  }}
                >
                  <span> {val.title}</span>
                  {val.description}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Stack
          direction={'row'}
          sx={{
            gap: '0.24rem',
            marginTop: '1rem',
          }}
        >
          <Stack
            sx={{
              marginTop: '0.5rem',
            }}
          >
            <Box
              sx={{
                width: '4px',
                height: '4px',
                backgroundColor: '#000',
                borderRadius: '50%',
              }}
            />
          </Stack>
          <Stack>
            <Typography
              sx={{
                fontFamily: 'Poppins',

                fontSize: '0.75rem',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal',
                span: {
                  color: 'rgba(0, 0, 0, 0.80)',
                  fontWeight: '700',
                },
              }}
            >
              <span> Need help? </span> Our support team is here to help
              <br />
              at{' '}
              <span
                style={{
                  color: '#512F6F',
                  textDecoration: 'underline',
                  textDecorationColor: '#512F6F',
                  fontWeight: '400',
                }}
              >
                support@weddingdaytimeline.com
              </span>
            </Typography>
          </Stack>
        </Stack>

        <Link href={LOGIN_URL} replace>
          <Button
            id="sign-in-btn"
            className="sign-in-btn"
            type="submit"
            variant="contained"
            sx={{
              textTransform: 'capitalize',
              color: '#ffffff',
              backgroundColor: '#00CAA5 !important',
              borderRadius: '20px',
              fontFamily: 'poppins',
              fontSize: '0.75rem',
              fontWeight: 500,
              height: '2.5rem',
              width: '100%',
              marginTop: '2.5rem',
            }}
          >
            Log In
          </Button>
        </Link>
      </Stack>
    </Grid>
  );
};

export default PasswordInfo;
