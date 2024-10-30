import Link from 'next/link';
import Image from 'next/image';
import Button from '../Button';
import { useState } from 'react';
import TitleName from './TitleName';
import { toast } from 'react-toastify';
import { BsArrowRightShort } from 'react-icons/bs';
import ShowAppLoaderOrContent from '../ShowAppLoaderOrContent';
import { PRIVACY_POLICY_LINK, TERMS_CONDITION_LINK } from 'routes';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Checkbox, FormControl, FormControlLabel, RadioGroup, Stack, Typography } from '@mui/material';

const Welcome = ({ nextClick }) => {
  const [isChechked, setIsChechked] = useState(false);

  const handleClick = () => {
    if (!isChechked) {
      toast.error('Please Select to Proceed');
      return;
    }
    nextClick();
  };

  return (
    <Stack
      sx={{
        backgroundColor: '#ffffff',
        height: '100%',
        paddingTop: '0.742rem',
      }}
    >
      <Stack
        sx={{
          alignItems: 'center',
          gap: '0.8rem',
        }}
      >
        <TitleName
          sx={{
            width: '200px',
          }}
          title="Tell us about your dream wedding"
        />
        <Image priority src="/images/onboarding/flower.svg" alt={'icon'} width={114} height={68} />
      </Stack>
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 400,
          textAlign: 'center',
          marginTop: '3.875rem',
          span: {
            color: '#00CAA5',
            fontWeight: 500,
            fontStyle: 'italic',
          },
        }}
      >
        Take our easy <span> 2-minute</span> wedding quiz and you’ll have the perfect timeline made just for your
        wedding that will keep you on time and stress free!
      </Typography>
      <Stack
        sx={{
          marginTop: '5.938rem',
        }}
      >
        <FormControl>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label">
            <div className="inline-block  text-purple text-w_xs1 xl:text-sm">
              <FormControlLabel
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontFamily: 'poppins',
                    fontSize: { xs: '0.688rem', xl: '0.886rem' },
                    padding: { xs: '0.5rem 0rem', lg: '0rem' },
                  },
                  alignItems: 'flex-start',
                }}
                control={
                  <Checkbox
                    onChange={(e, value) => setIsChechked(value)}
                    value={isChechked}
                    icon={<RadioButtonUncheckedIcon sx={{ color: '#000000', opacity: '40%' }} />}
                    checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#000000', opacity: '40%' }} />}
                  />
                }
                label={
                  <Typography
                    sx={{
                      color: '#000000',
                      fontSize: '1rem',
                      fontWeight: '500',
                      marginTop: '0.54rem',
                      opacity: '40%',
                      fontStyle: 'italic',
                      span: {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    I have read and agree to the{' '}
                    <Link href={TERMS_CONDITION_LINK} target="_blank">
                      {' '}
                      <span>terms of service</span>
                    </Link>{' '}
                    and{' '}
                    <Link href={PRIVACY_POLICY_LINK} target="_blank">
                      <span>privacy policy</span>
                    </Link>
                  </Typography>
                }
              />
            </div>
          </RadioGroup>
        </FormControl>

        <Stack
          sx={{
            marginTop: '3.125rem',
          }}
        >
          <Button
            className="flex justify-center items-center xl:h-10 cursor-pointer rounded-lg w-full py-7 bg-[#00CAA599!important] h-[68px]"
            type="submit"
            id="next-btn"
            onClick={handleClick}
          >
            <div className="flex justify-center items-center font-semibold px-8 py-2 w-screen">
              <ShowAppLoaderOrContent data={false} size={30} color={'#fff'}>
                <Stack
                  direction={'row'}
                  sx={{
                    gap: '0.25rem',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 700,
                    }}
                  >
                    Let’s Go
                  </Typography>
                  <BsArrowRightShort fontSize={'30px'} />
                </Stack>
              </ShowAppLoaderOrContent>
            </div>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Welcome;
