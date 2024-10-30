import Button from '../Button';
import Image from 'next/image';
import { SALE_URL } from 'routes';
import { useRouter } from 'next/router';
import { Stack, Typography } from '@mui/material';
import { BsArrowRightShort } from 'react-icons/bs';
import ShowAppLoaderOrContent from '../ShowAppLoaderOrContent';

const CompleteLoading = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(SALE_URL);
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '75vh',
      }}
    >
      <Stack>
        <Image src={'/images/onboarding/circleComplete.svg'} alt="" width={250} height={250} />
      </Stack>
      <Typography
        sx={{
          fontSize: '1.25rem',
          fontWeight: 700,
          textAlign: 'center',
          marginTop: '1rem',
          lineHeight: '1.513rem',
          color: '#000000',
          opacity: '80%',
        }}
      >
        Your personalized Wedding Day Timeline has been created!
      </Typography>
      <Stack
        sx={{
          marginTop: '3.125rem',
          width: '100%',
          marginBottom: { lg: '0rem', xs: '2.75rem' },
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
              <>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 700,
                  }}
                >
                  Continue
                </Typography>
                <BsArrowRightShort fontSize={'30px'} />
              </>
            </ShowAppLoaderOrContent>
          </div>
        </Button>
      </Stack>
    </Stack>
  );
};

export default CompleteLoading;
