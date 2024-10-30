import Button from '../Button';
import { ROOT_URL } from 'routes';
import { useRouter } from 'next/router';
import { AppLoader } from '../AppLoader';
import { Stack, Typography } from '@mui/material';
import TitleName from '../NewOnbordingComponents/TitleName';
import ShowAppLoaderOrContent from '../ShowAppLoaderOrContent';
import { clearOnboardingAndResetTimelineData } from 'utils/localStorage';

const ResetTimelineCard = ({ showCancelButton = true, onNext, isLoading }) => {
  const router = useRouter();

  const removeItemsFromLocalStorage = () => {
    clearOnboardingAndResetTimelineData();
    router.replace(ROOT_URL);
  };

  return (
    <Stack
      sx={{
        backgroundColor: '#ffffff',
        height: '100%',
      }}
    >
      <Stack
        sx={{
          alignItems: 'center',
          gap: '0.8rem',
          mb: '300px',
        }}
      >
        <TitleName title="You're about to reset your timeline. This action is irreversible" />
      </Stack>
      <Stack>
        {!showCancelButton ? (
          <></>
        ) : (
          <Button
            className="flex justify-center items-center xl:h-10 cursor-pointer rounded-lg w-full py-7 bg-[white!important] h-[68px] mb-[8px] border-[1px] border-[#00CAA599!important]"
            type="submit"
            id="next-btn"
            onClick={removeItemsFromLocalStorage}
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
                      color: '#00CAA599',
                    }}
                  >
                    Cancel
                  </Typography>
                </Stack>
              </ShowAppLoaderOrContent>
            </div>
          </Button>
        )}
      </Stack>
      <Stack>
        <Button
          className="flex justify-center items-center xl:h-10 cursor-pointer rounded-lg w-full py-7 bg-[#00CAA599!important] h-[68px] mb-10"
          type="submit"
          id="next-btn"
          onClick={onNext}
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
                {isLoading ? (
                  <AppLoader color="white" height="initial" />
                ) : (
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 700,
                    }}
                  >
                    Reset Timeline
                  </Typography>
                )}
              </Stack>
            </ShowAppLoaderOrContent>
          </div>
        </Button>
      </Stack>
    </Stack>
  );
};

export default ResetTimelineCard;
