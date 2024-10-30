import { Stack, Typography } from '@mui/material';
import Button from 'components/common/Button';
import { useEffect, useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { getMapValueCopy } from 'utils/strings';
import { errorToast } from 'utils/toast';
import { AppLoader } from '../AppLoader';
import MapFieldCopy from '../MapFieldCopy';
import ShowAppLoaderOrContent from '../ShowAppLoaderOrContent';
import TitleName from './TitleName';
import { NEW_ONBOARDING_STEPS_KEYS } from 'constants/localStorage';

const Ceremony = ({ nextClick }) => {
  const [LocationValue, setValue] = useState<google.maps.places.PlaceResult>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (LocationValue) {
      localStorage.setItem(NEW_ONBOARDING_STEPS_KEYS.CEREMONY_LOCATION_SELECTION, JSON.stringify(LocationValue));
    }
  }, [LocationValue]);

  useEffect(() => {
    const locate = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.CEREMONY_LOCATION_SELECTION);
    if (locate && locate != undefined) {
      setValue(JSON.parse(locate));
    }
  }, []);

  const handleClick = () => {
    if (!LocationValue) {
      errorToast('Please select a location before proceeding.');
    } else {
      nextClick();
    }
  };

  return (
    <Stack
      sx={{
        height: { lg: '100%', xs: '100%' },
        justifyContent: { lg: 'flex-start', xs: 'space-between' },
      }}
    >
      <Stack>
        <Stack
          sx={{
            gap: '1.5rem',
          }}
        >
          <TitleName title="Where is your ceremony?" />
          <Typography
            sx={{
              lineHeight: '1.056rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              textAlign: 'center',
              color: '#000000',
              opacity: '40%',
              fontStyle: 'italic',
            }}
          >
            If unsure, pick a central spot in your wedding city.
          </Typography>
        </Stack>

        <Stack
          sx={{
            position: 'relative',
            marginTop: '2.188rem',
            boxShadow: '0px 4px 4px 0px #00000033',
            borderRadius: '0.5rem',
          }}
        >
          <MapFieldCopy
            setIsLoading={setIsLoading}
            icon={true}
            val={getMapValueCopy(LocationValue!)}
            setValue={setValue}
            sx={{
              padding: '1.2rem 1rem',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: '0.5rem',
            }}
            inputStyle={{
              border: 'none',
              outline: 'none',
              paddingLeft: '0.75rem',
            }}
          />
        </Stack>
      </Stack>

      <Stack sx={{ marginTop: { lg: '15.5rem', xs: '2rem' }, marginBottom: { lg: '0rem', xs: '2.75rem' } }}>
        <Button
          className="flex justify-center items-center xl:h-10 cursor-pointer rounded-lg w-full py-7 bg-[#00CAA599!important] h-[68px]"
          type="submit"
          id="next-btn"
          onClick={isLoading ? undefined : handleClick}
        >
          <div className="flex justify-center items-center font-semibold px-8 ">
            <ShowAppLoaderOrContent data={false} size={30} color={'#fff'}>
              <Stack
                direction={'row'}
                sx={{
                  gap: '0.25rem',
                  alignItems: 'center',
                }}
              >
                {isLoading ? (
                  <>
                    <AppLoader color="white" height="auto" />
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 700,
                      }}
                    >
                      Next
                    </Typography>
                    <BsArrowRightShort fontSize={'30px'} />
                  </>
                )}
              </Stack>
            </ShowAppLoaderOrContent>
          </div>
        </Button>
      </Stack>
    </Stack>
  );
};

export default Ceremony;
