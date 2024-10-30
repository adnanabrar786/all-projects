import groupBy from 'lodash.groupby';
import Image from 'next/image';
import { errorToast } from 'utils/toast';
import Layout from 'components/ui/Layout';
import useGetQuery from 'hooks/useGetQuery';
import { useUserInfo } from 'state/useUser';
import { Grid, Stack } from '@mui/material';
import { useWedInfo } from 'state/useWedding';
import { useCoupleInfo } from 'state/useCouple';
import { AppLoader } from 'components/common/AppLoader';
import { useCallback, useEffect, useState } from 'react';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import { TIMELINE_EVENT_NAME, TimelineType } from 'utils/enums';
import NewTopComponent from 'components/common/NewTopComponent';
import CustomText from 'components/pages/home/NewDashboard/CustomText';
import TimelineCard from 'components/pages/home/NewDashboard/TimelineCard';
import ModalResetTimeline from 'components/pages/home/NewDashboard/ModalResetTimeline';

export default function Page() {
  const [showTimeLineModal, setResetTimelineModal] = useState(false);
  const { coupleInfo, isInit } = useCoupleInfo();
  const { userInfo } = useUserInfo();
  const { fetchWedInfo } = useWedInfo();
  const [zone, setZone] = useState<string>('');
  const [primaryTimeline, setPrimaryTimeline] = useState<any[]>([]);
  const [secondaryTimeline, setSecondaryTimeline] = useState<any[]>([]);
  const [combinedTimeline, setCombinedTimeline] = useState<any[]>([]);
  const [fianceDetails, setFianceDetails] = useState<any>();
  const [isFirstLook, setIsFirstLook] = useState(false);

  const toggleResetTimelineModal = useCallback(() => {
    setResetTimelineModal((prev) => !prev);
  }, []);

  const checkStatus = useCallback(async () => {
    if (coupleInfo) {
      const fiance = coupleInfo.find((element) => element.createdBy !== element.user_id)?.user;
      if (fiance) {
        setFianceDetails(fiance);
      }
    }
  }, [isInit, coupleInfo]);

  useEffect(() => {
    fetchWedInfo();
    checkStatus();
  }, [checkStatus]);

  useGetQuery(
    { key: REACT_QUERY_KEYS.GET_TIMELINE },
    {
      onSuccess: (res) => {
        const _data = res.data.data;
        setZone(_data.timezone);
        const groupedTimeline = groupBy(_data.timeline, 'timeline_type');
        setPrimaryTimeline(groupedTimeline[TimelineType.PRIMARY_TIMELINE]);
        setSecondaryTimeline(groupedTimeline[TimelineType.SECONDARY_TIMELINE]);
        setCombinedTimeline(groupedTimeline[TimelineType.COMBINE_TIMELINE]);
        const firstLookInTimelIne = _data.timeline.find((item) => {
          return item.event_name_hidden == TIMELINE_EVENT_NAME.FIRST_LOOK;
        });
        const isFirstLookInList = firstLookInTimelIne?.event_name_hidden === TIMELINE_EVENT_NAME.FIRST_LOOK;
        setIsFirstLook(isFirstLookInList);
      },
      onError() {
        errorToast(ERROR_MESSAGES.GETTING_TIMELINE);
      },
    },
  );

  return (
    <Stack>
      {fianceDetails && primaryTimeline.length ? (
        <div className="overflow-y-auto w-full h-[85vh]">
          <Stack
            sx={{
              padding: { lg: '0px 43px 0px 31px', xs: '0px 0px' },
            }}
          >
            <NewTopComponent />
          </Stack>

          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: 'center',
              padding: { lg: '0px 33px 0px 5px', xs: '0px 16px' },
              '&.MuiGrid-root': {
                marginLeft: { lg: '0px', xs: '0px 16px' },
              },
            }}
          >
            <Grid
              item
              sm={10}
              xs={12}
              md={7}
              lg={4}
              sx={{
                marginTop: '24px',
                justifyContent: { lg: 'space-between', xs: 'center' },
                alignItems: { lg: 'flex-start', xs: 'center' },
                '&.MuiGrid-item': {
                  paddingLeft: { lg: '0px', xs: '16px' },
                },
              }}
            >
              <TimelineCard
                type={TimelineType.PRIMARY_TIMELINE}
                timelineData={primaryTimeline}
                zone={zone}
                showTimeLineModal={showTimeLineModal}
                toggleResetTimelineModal={toggleResetTimelineModal}
                topAndLeft={'#00CAA5'}
                rightAndBottom={'#00CAA5'}
                img={userInfo?.picture ?? ''}
                primaryName={`${userInfo ? userInfo.first_name : ''}`}
                fianceName={fianceDetails ? fianceDetails.first_name : ''}
                bothImages={false}
                isFirstLook={isFirstLook}
              />
            </Grid>

            <Grid
              item
              sm={10}
              xs={12}
              md={7}
              lg={4}
              sx={{
                marginTop: '24px',
                justifyContent: { lg: 'space-between', xs: 'center' },
                alignItems: { lg: 'flex-start', xs: 'center' },
                gap: '12px',
                '&.MuiGrid-item': {
                  paddingLeft: { lg: '0px', xs: '16px' },
                },
              }}
            >
              <TimelineCard
                type={TimelineType.SECONDARY_TIMELINE}
                timelineData={secondaryTimeline}
                zone={zone}
                showTimeLineModal={showTimeLineModal}
                toggleResetTimelineModal={toggleResetTimelineModal}
                topAndLeft={'#C8A2C8'}
                rightAndBottom={'#C8A2C8'}
                secondary={true}
                img={fianceDetails?.picture}
                primaryName={fianceDetails ? fianceDetails.first_name : ''}
                fianceName={fianceDetails ? fianceDetails.first_name : ''}
                bothImages={false}
                isFirstLook={isFirstLook}
              />
            </Grid>

            <Grid
              item
              sm={10}
              xs={12}
              md={7}
              lg={4}
              sx={{
                marginTop: '24px',
                justifyContent: { lg: 'space-between', xs: 'center' },
                alignItems: { lg: 'flex-start', xs: 'center' },
                '&.MuiGrid-item': {
                  paddingLeft: { lg: '0px', xs: '16px' },
                },
              }}
            >
              <TimelineCard
                type={TimelineType.COMBINE_TIMELINE}
                timelineData={combinedTimeline}
                zone={zone}
                showTimeLineModal={showTimeLineModal}
                toggleResetTimelineModal={toggleResetTimelineModal}
                topAndLeft={'#00CAA5'}
                rightAndBottom={'#C8A2C8'}
                bothImages={true}
                primaryName={`${userInfo ? userInfo.first_name : ''} & ${fianceDetails ? fianceDetails.first_name : ''}`}
                fianceName={fianceDetails ? fianceDetails.first_name : ''}
                img={userInfo?.picture ?? ''}
                fianceImage={fianceDetails?.picture}
                isFirstLook={isFirstLook}
              />
            </Grid>
          </Grid>

          <Stack
            direction={'row'}
            sx={{
              padding: '8px 15px',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '24px',
            }}
          >
            <Stack
              direction={'row'}
              sx={{
                width: 'fit-content',
                gap: '8px',
                cursor: 'pointer',
              }}
              onClick={toggleResetTimelineModal}
            >
              <Image src="/images/dashboard/sync.svg" alt="" width={16} height={16} />
              <CustomText
                text="Reset The Timeline"
                sx={{
                  fontSize: '12px',
                  lineHeight: '18px',
                }}
              />
            </Stack>
          </Stack>
          {showTimeLineModal && <ModalResetTimeline open={showTimeLineModal} toggleModal={toggleResetTimelineModal} />}
        </div>
      ) : (
        <Stack
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AppLoader
            sx={{
              color: '#fff',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
              '& .MuiCircularProgress-circleStatic': {
                strokeLinecap: 'round',
              },
            }}
            size={40}
          />
        </Stack>
      )}
    </Stack>
  );
}

Page.getLayout = (page: JSX.Element) => {
  return <Layout heading="WeddingDayTimeline - Home">{page}</Layout>;
};
