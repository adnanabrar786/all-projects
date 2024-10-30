import { Stack } from '@mui/material';
import { errorToast } from 'utils/toast';
import Layout from 'components/ui/Layout';
import { AppText } from 'utils/enums/text';
import useGetQuery from 'hooks/useGetQuery';
import { useEffect, useState } from 'react';
import MapInfo from 'components/common/MapInfo';
import { useCoupleInfo } from 'state/useCouple';
import LocationMap from 'components/common/LocationMap';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import NewTopComponent from 'components/common/NewTopComponent';
import { GettingReady, PhotographyTypeDescriptions } from 'constants/enums';
import ShowAppLoaderOrContent from 'components/common/ShowAppLoaderOrContent';
export default function Page() {
  const [couple, setCouple] = useState([]);
  const [weddingLocations, setWeddingLocations] = useState<any[]>([]);
  const { coupleInfo, isInit, isLoading } = useCoupleInfo();
  const [getLocation, setGetLocation] = useState({
    id: 0,
    name: '',
    address: '',
    lat: 0,
    lng: 0,
  });

  const getCommonLocationProperties = (name, obj) => {
    return {
      id: obj.id,
      name: name,
      lat: obj.lat,
      lng: obj.long,
      person: '',
      address: obj.location_metadata?.formatted_address,
      address_name: obj.location_metadata?.name,
    };
  };

  const getCoupleInfoById = (id) => {
    if (couple) return couple.find((item: any) => id === item.id);
  };
  useEffect(() => {
    if (!isInit && !coupleInfo) {
      errorToast(ERROR_MESSAGES.GETTING_COUPLE);
      return;
    }
    setCouple(coupleInfo);
  }, [coupleInfo, isInit]);

  function getGettingReadyType(type) {
    switch (type) {
      case 'DRESSING':
        return GettingReady.DRESSING;
      case 'HAIR_AND_MAKEUP':
        return GettingReady.HAIR_AND_MAKEUP;
      default:
        return null;
    }
  }
  const locs = useGetQuery(
    { key: REACT_QUERY_KEYS.WEDDING_LOCATION, params: isInit },
    {
      onSuccess: (res) => {
        const resp = { ...res.data };
        const weddingArray: any[] = [];

        for (let item = 0; item < resp.data.length; item++) {
          let locationData = resp.data[item].data;
          if (!Array.isArray(locationData)) {
            locationData = [locationData];
          }
          const filteredData = locationData.filter((obj) => obj.lat);
          filteredData.forEach((obj) => {
            const subEntity = getCommonLocationProperties(resp.data[item].title, obj);
            if (resp.data[item].title === 'Getting Ready') {
              subEntity['type'] = getGettingReadyType(obj.type);
              const coupleFound: any = getCoupleInfoById(obj.couple_id);
              subEntity['couple_name'] = coupleFound?.user.first_name;
            } else if (resp.data[item].title === 'Special First Look Photos') {
              subEntity['person'] = obj.person;
              const coupleFound: any = getCoupleInfoById(obj.couple_id);
              subEntity['couple_name'] = coupleFound?.user.first_name + ' With';
            } else if (resp.data[item].title === 'Photography') {
              subEntity['type'] = PhotographyTypeDescriptions[obj.type];
            }

            weddingArray.push(subEntity);
          });
        }

        setWeddingLocations(weddingArray);
        setGetLocation(weddingArray[0]);
      },
      onError(error) {
        errorToast(ERROR_MESSAGES.GETTING_WEDDING_LOCATION);
      },
    },
  );

  return (
    <ShowAppLoaderOrContent data={locs.isLoading || locs.isFetching || isLoading} size={40}>
      <div className="overflow-y-auto w-full h-[85vh]">
        <Stack
          sx={{
            padding: { lg: '0px 43px 0px 31px', xs: '0px 0px' },
          }}
        >
          <NewTopComponent />
        </Stack>
        <div className="flex w-full px-4 py-4 min-h-74 sm:px-8">
          <div className="w-full min-h-[800px] px-2 py-6 sm:p-6 border-t-8 my-10 border-t-non_photo_blue border-gray-200 shadow-md rounded-lg bg-white overflow-y-hidden">
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <p className="text-purple font-semibold text-w_0xl_1 xl:text-w_4xl pb-4">{AppText.LOCATIONS}</p>
                <p className="pb-4 text-xs xl:text-sm font-light  text-purple">{AppText.VIEW_THE_LOCATIONS_TEXT}</p>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="overflow-y-auto h-[95vh]">
                <MapInfo dataArray={weddingLocations} setGetLocation={setGetLocation} />
              </div>
              <div className="h-[340px] sm:h-[640px]">
                {getLocation && <LocationMap getLocation={getLocation} locations={weddingLocations} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShowAppLoaderOrContent>
  );
}

Page.getLayout = (page: JSX.Element) => {
  return <Layout heading="Locations">{page}</Layout>;
};
