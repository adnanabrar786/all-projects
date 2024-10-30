import { Box, Rating, Stack, Typography } from '@mui/material';
import ArrowGreenButton from 'components/common/ArrowGreenButton/ArrowGreenButton';
import Link from 'components/common/Link';
import { saveTimeBlogData } from 'constants/constants';
import Image from 'next/image';
import CustomText from '../home/NewDashboard/CustomText';

type Props = {
  price: string;
  checkoutLink: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export default function Blog({ price, checkoutLink, isLoading, setIsLoading }: Props) {
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: { md: '145px', sm: '140px', xs: '100px' },
        position: 'relative',
        padding: { md: '0px 0px', sm: '0px 61px', xs: '0px 17px' },
      }}
    >
      <Stack
        sx={{
          position: 'relative',
          width: { md: '63.92px', sm: '53.37px', xs: '47px' },
          height: { md: '96.06px', sm: '75px', xs: '68px' },
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
          },
        }}
      >
        <Image priority alt="pic" src="/images/dashboard/medal.svg" width={60} height={60} />
      </Stack>

      <Typography
        sx={{
          marginTop: { md: '45.38px', xs: '40px' },
          fontFamily: 'Poppins',
          fontWeight: '400',
          fontSize: { md: '32px', sm: '24px', xs: '22px' },
          lineHeight: { md: '45.13px', sm: '36px', xs: '33px' },
          color: 'var(--black)',
          letterSpacing: '2%',
          width: { md: '100%', sm: '400px' },
          textAlign: 'center',
          span: {
            fontWeight: '700',
            color: 'var(--purple)',
          },
        }}
      >
        Couples <span> Love</span> using Wedding Day Timeline!
      </Typography>

      <Stack
        sx={{
          marginTop: { md: '50px', sm: '45px', xs: '50px' },
          gap: '26px',
          maxWidth: '750px',
        }}
      >
        {saveTimeBlogData.map((val, index) => (
          <Stack key={index}>
            <Stack
              sx={{
                border: '1px solid #FFB800',
                borderRadius: '16px',
                padding: { sm: '22px 46.17px 22.1px 47px', xs: '39px 18px 39px 20px' },
              }}
            >
              <Stack
                direction={{ md: 'row', xs: 'column' }}
                sx={{
                  gap: '24.87px',
                }}
              >
                <Stack
                  sx={{
                    alignItems: 'flex-start',
                  }}
                >
                  <Image priority alt="pic" src={val.img} width={62} height={62} />
                </Stack>

                <Stack>
                  <Stack
                    direction={'row'}
                    sx={{
                      maxWidth: '569.97px',
                    }}
                  >
                    <CustomText
                      sx={{
                        lineHeight: '36px',
                        letterSpacing: '5%',
                        fontWeight: '500',
                        color: 'var(--black-100)',
                        fontSize: '24px',
                      }}
                      text={`“`}
                    />

                    <Typography
                      sx={{
                        fontFamily: 'Poppins',
                        fontWeight: '400',
                        fontSize: '20px',
                        lineHeight: '30px',
                        color: 'var(--black-100)',
                        letterSpacing: '5%',
                        span: {
                          fontWeight: '500',
                          color: 'var(--black-100)',
                          fontSize: '24px',
                          lineHeight: '36px',
                          fontFamily: 'Poppins',
                        },
                      }}
                    >
                      {val.title}
                      <span>”</span>
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      marginTop: '19px',
                      marginLeft: '10px',
                    }}
                  >
                    <CustomText
                      sx={{
                        fontWeight: '600',
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: 'var(--purple)',
                      }}
                      text={val.name}
                    />
                    <Rating
                      name="read-only"
                      value={val.rating}
                      readOnly
                      sx={{
                        fontSize: '18px',
                        color: 'var(--yellow)',
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Box
        sx={{
          marginTop: { md: '75px', sm: '80px', xs: '69px' },
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Link href={checkoutLink} target={checkoutLink}>
          <ArrowGreenButton
            onClick={() => {
              setIsLoading(true);
            }}
            loaderColor={'#ffffff'}
            loading={isLoading}
            sx={{
              width: '344px',
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
          width: { sm: '105.22px', xs: '72.35px' },
          height: '105.22px',
          top: { sm: '-10px', xs: '-300px' },
          left: '0px',
          img: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '420px',
          },
        }}
      >
        <Image priority alt="complex" src="/images/dashboard/halfBlueCircle.svg" fill sizes="100%" />
      </Stack>
    </Stack>
  );
}
