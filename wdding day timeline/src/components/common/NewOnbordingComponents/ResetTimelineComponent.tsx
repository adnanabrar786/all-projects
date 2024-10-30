import { useState } from 'react';
import { DateTime } from 'luxon';
import { ROOT_URL } from 'routes';
import { AxiosError } from 'axios';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { WeddingService } from 'services/wedding.service';
import { NEW_ONBOARDING_STEPS_KEYS, PRIMARY_COUPLE_ID_KEY, SECONDARY_COUPLE_ID_KEY } from 'constants/localStorage';
import { GettingTypeCategory, USER_VERSIONS } from '@prisma/client';
import ResetTimelineCard from 'components/common/ResetTimelineCard';
import { clearOnboardingAndResetTimelineData } from 'utils/localStorage';
import ShowAppLoaderOrContent from 'components/common/ShowAppLoaderOrContent';

type Props = {
  user_version: USER_VERSIONS;
};

const ResetTimelineComponent = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const weddingService = new WeddingService();
  const router = useRouter();

  const createResetTimeline = useMutation(weddingService.ResetTimeline, {
    onSuccess: () => {
      clearOnboardingAndResetTimelineData();

      setIsLoading(false);
      router.push(ROOT_URL);
    },
    onError(error: AxiosError) {
      const err: any = error;
      if (err.response.data.error) {
        toast.error(err.response.data.message);
        return;
      }
      setIsLoading(false);
      toast.error(err.message);
    },
  });

  function createResetTimelineBody() {
    const offset = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.OFFSET);
    const date = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_DATE);
    const primary_couple_id = localStorage.getItem(PRIMARY_COUPLE_ID_KEY);
    const secondary_couple_id = localStorage.getItem(SECONDARY_COUPLE_ID_KEY);
    const firstLook = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.FIRST_LOOK);
    const ceremony = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.CEREMONY_LOCATION_SELECTION);
    const reception = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.RECEPTION_LOCATION);
    const primaryDressed = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.PRIMARY_GETTING_DRESSED);
    const secondaryDressed = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.SECONDARY_GETTING_DRESSED);
    const primaryHairMakeup = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.PRIMARY_HAIR_AND_MAKEUP);
    const secondaryHairMakeup = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.SECONDARY_HAIR_AND_MAKEUP);
    const firstLookLocation = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.FIRST_LOOK_LOCATION);
    const weddingEpochUTC = localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_TIME)
      ? parseInt(localStorage.getItem(NEW_ONBOARDING_STEPS_KEYS.WEDDING_TIME)!)
      : 0;

    const ceremonyData = JSON.parse(ceremony!);
    const receptionData = JSON.parse(reception!);
    const primaryDressedData = JSON.parse(primaryDressed!);
    const secondaryDressedData = JSON.parse(secondaryDressed!);
    const primaryHairMakeupData = JSON.parse(primaryHairMakeup!);
    const secondaryHairMakeupData = JSON.parse(secondaryHairMakeup!);
    const firstLookLocationData = JSON.parse(firstLookLocation!);

    const body: any = {
      data: {
        timezone_offset: Number(offset),
        weddingDate: Number(date),
        timezone: DateTime.local().toFormat('z'),
        primary_couple_id: Number(primary_couple_id),
        secondary_couple_id: Number(secondary_couple_id),
        ceremony: {
          location_metadata: ceremonyData,
          lat: ceremonyData.geometry.location.lat,
          long: ceremonyData.geometry.location.lng,
          start_time: weddingEpochUTC,
        },
        reception: {
          lat: receptionData.geometry.location.lat,
          long: receptionData.geometry.location.lng,
          location_metadata: receptionData,
        },
      },
    };

    if (primaryDressedData != undefined || primaryDressedData != null) {
      body.data.primary_dressed = {
        lat: primaryDressedData.geometry.location.lat,
        long: primaryDressedData.geometry.location.lng,
        location_metadata: primaryDressedData,
        type: GettingTypeCategory.DRESSING,
      };
    }

    if (secondaryDressedData != undefined || secondaryDressedData != null) {
      body.data.secondary_dressed = {
        lat: secondaryDressedData.geometry.location.lat,
        long: secondaryDressedData.geometry.location.lng,
        location_metadata: secondaryDressedData,
        type: GettingTypeCategory.DRESSING,
      };
    }

    if (primaryHairMakeupData != undefined || primaryHairMakeupData != null) {
      body.data.primary_hairMakeup = {
        lat: primaryHairMakeupData.geometry.location.lat,
        long: primaryHairMakeupData.geometry.location.lng,
        location_metadata: primaryHairMakeupData,
        type: GettingTypeCategory.HAIR_AND_MAKEUP,
      };
    }

    if (secondaryHairMakeupData != undefined || secondaryHairMakeupData != null) {
      body.data.secondary_hairMakeup = {
        lat: secondaryHairMakeupData.geometry.location.lat,
        long: secondaryHairMakeupData.geometry.location.lng,
        location_metadata: secondaryHairMakeupData,
        type: GettingTypeCategory.HAIR_AND_MAKEUP,
      };
    }

    if (firstLookLocationData != undefined || (firstLookLocationData != null && firstLook === 'Yes')) {
      body.data.firstlook = {
        status: true,
        lat: firstLookLocationData.geometry.location.lat,
        long: firstLookLocationData.geometry.location.lng,
        location_metadata: firstLookLocationData,
      };
    } else {
      body.data.firstlook = {
        status: false,
        lat: null,
        long: null,
      };
    }
    return body;
  }

  const handleNext = () => {
    setIsLoading(true);
    createResetTimeline.mutate(createResetTimelineBody());
  };

  return (
    <ShowAppLoaderOrContent data={false} size={40}>
      <div className="w-full bg-grey-200">
        <div>
          <Stack
            sx={{
              alignItems: 'center',
              maxHeight: 'auto',
              backgroundColor: { lg: '#F2F0F5', xs: '#ffffff' },
              position: 'relative',
            }}
          >
            <Stack
              sx={{
                width: '375px',
                minWidth: '320px',
                paddingTop: { lg: '4.5rem', xs: '3.625rem' },
                maxHeight: '100%',
                backgroundColor: '#ffffff',
                paddingBottom: { lg: '2rem', xs: '0rem' },
              }}
            >
              <Stack
                sx={{
                  width: '100%',
                  padding: '0rem 1rem 0rem 1rem',
                  height: '100%',
                }}
              >
                <Stack
                  sx={{
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <ResetTimelineCard
                    showCancelButton={props.user_version !== USER_VERSIONS.V2}
                    onNext={handleNext}
                    isLoading={isLoading}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    </ShowAppLoaderOrContent>
  );
};

export default ResetTimelineComponent;
