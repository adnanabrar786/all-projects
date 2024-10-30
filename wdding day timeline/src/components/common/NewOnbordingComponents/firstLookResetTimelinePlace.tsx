import { Stack, Typography } from '@mui/material';
import Button from 'components/common/Button';
import { LOCATIONTYPES } from 'constants/constants';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { getMapValueCopy } from 'utils/strings';
import { errorToast } from 'utils/toast';
import { AppLoader } from '../AppLoader';
import MapFieldCopy from '../MapFieldCopy';
import ShowAppLoaderOrContent from '../ShowAppLoaderOrContent';
import CouplesCard from './CouplesCard';
import TitleName from './TitleName';
import { NEW_ONBOARDING_STEPS_KEYS } from 'constants/localStorage';

const FirstLookResetTimelinePlace = ({ nextClick }) => {
  const [LocationValue, setValue] = useState<google.maps.places.PlaceResult>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (LocationValue) {
      localStorage.setItem(NEW_ONBOARDING_STEPS_KEYS.FIRST_LOOK_LOCATION, JSON.stringify(LocationValue));
    }
  }, [LocationValue]);

  const formik = useFormik({
    initialValues: {
      primary: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
  });

  const handleClick = (e) => {
    if (e.target.name === 'primary') {
      formik.setFieldValue('primary', e.target.value);
    }
  };

  useEffect(() => {
    const locate = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.FIRST_LOOK_LOCATION);
    if (locate && locate != undefined) {
      setValue(JSON.parse(locate));
    }
  }, []);

  useEffect(() => {
    if (formik.values.primary === 'Ceremony Location') {
      const locate = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.CEREMONY_LOCATION_SELECTION);
      if (locate && locate != undefined) {
        setValue(JSON.parse(locate));
      }
    }
    if (formik.values.primary === 'Reception Location') {
      const locate = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.RECEPTION_LOCATION);
      if (locate && locate != undefined) {
        setValue(JSON.parse(locate));
      }
    }
  }, [formik.values.primary]);

  const handleSubmit = () => {
    if (!LocationValue) {
      errorToast('Please select a location before proceeding.');
    } else {
      setIsLoading(true);
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
        <TitleName title="Where is your first look going to take place?" />

        <Stack
          sx={{
            marginTop: '1.5rem',
          }}
        >
          <CouplesCard list={LOCATIONTYPES} onChange={handleClick} value={formik.values.primary} name="primary" />
        </Stack>

        <Stack
          sx={{
            position: 'relative',
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
            }}
            inputStyle={{
              border: 'none',
              outline: 'none',
              paddingLeft: '0.75rem',
            }}
          />
        </Stack>
      </Stack>
      <Stack sx={{ marginTop: { lg: '2rem', xs: '2rem' }, marginBottom: { lg: '0rem', xs: '2.75rem' } }}>
        <Button
          className="flex justify-center items-center xl:h-10 cursor-pointer rounded-lg w-full py-7 bg-[#00CAA599!important] h-[68px]"
          type="submit"
          id="next-btn"
          onClick={isLoading ? undefined : handleSubmit}
          // disabled={LocationValue ? false : true}
        >
          <div className="flex justify-center items-center font-semibold px-8 py-2">
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
                    <AppLoader color="white" />
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

export default FirstLookResetTimelinePlace;
