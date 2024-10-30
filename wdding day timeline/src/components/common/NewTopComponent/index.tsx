import { Grid, Stack, Typography } from '@mui/material';
import { Users, Wedding } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import CustomDatePicker from 'components/pages/home/NewDashboard/CustomDatePicker';
import moment from 'moment';
import 'moment-precise-range-plugin';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { WeddingService } from 'services/wedding.service';
import { useCoupleInfo } from 'state/useCouple';
import { useUserInfo } from 'state/useUser';
import { useWedInfo } from 'state/useWedding';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import { errorToast } from 'utils/toast';
import { AppLoader } from '../AppLoader';
import Newbanner from './Newbanner';
import NewTimeUnit from './NewTimeUnit';
import useGetQuery from 'hooks/useGetQuery';

function NewTopComponent() {
  const [days, setDays] = useState<string>();
  const [weeks, setWeeks] = useState<string>();
  const [months, setMonths] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sunsetTime, setSunsetTime] = useState(null);
  const [userDetails, setUserDetails] = useState<Users>();
  const [fianceDetails, setFianceDetails] = useState<Users>();
  const [weddingDetails, setWeddingDetails] = useState<Wedding>();
  const weddingService = new WeddingService();
  const queryClient = useQueryClient();

  const weddingInfo = useWedInfo();
  const coupleInfo = useCoupleInfo();
  const user = useUserInfo();

  const [value, setValue] = useState<any>(null);
  const [epochValue, setEpochValue] = useState<any>(null);

  const handleChange = (newValue) => {
    setValue(newValue);
    const date = moment(newValue.toDate()).unix();
    if (date) {
      setEpochValue(date.toString());
    }
  };

  useEffect(() => {
    const date = Number(weddingInfo?.weddingInfo?.date) * 1000;
    setValue(date);
  }, []);

  const onDone = () => {
    setIsLoading(true);
    updateWeddingDateMutation.mutate({
      data: {
        weddingDate: Number(epochValue),
      },
    });
  };

  useGetQuery(
    {
      key: REACT_QUERY_KEYS.SUNSET_TIME,
    },
    {
      onSuccess: ({ data }) => {
        const _data = data.data;
        setSunsetTime(_data);
      },
      onError: () => {
        errorToast('Failed to get Sunset Time');
      },
    },
  );

  const updateWeddingDateMutation = useMutation((body: any) => weddingService.UpdateWeddingDate(body), {
    onSuccess: async ({ data }) => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.GET_TIMELINE]);
      queryClient.invalidateQueries([REACT_QUERY_KEYS.SUNSET_TIME]);

      weddingInfo.fetchWedInfo();
      const date = weddingInfo.weddingInfo?.date;
      if (date) getRemaining(Number(date));
      setIsLoading(false);
      toast.success('Date Updated');
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

  useEffect(() => {
    if (!weddingInfo.isInit && weddingInfo.error && !weddingInfo.weddingInfo) {
      errorToast('Wedding Not Found');
      return;
    }
    setWeddingDetails(weddingInfo.weddingInfo!);
    if (weddingInfo.weddingInfo) {
      const date = weddingInfo.weddingInfo.date;
      if (date) getRemaining(Number(date));
    }
  }, [weddingInfo.error, weddingInfo.isInit, weddingInfo.weddingInfo]);

  useEffect(() => {
    if (user.error) {
      errorToast(user.error?.message);
      return;
    }
    setUserDetails(user.userInfo!);
  }, [user]);

  useEffect(() => {
    if (!coupleInfo.isInit && !coupleInfo.coupleInfo) {
      errorToast(coupleInfo.error?.message!);
      return;
    }
    if (!coupleInfo.isInit) {
      const data = coupleInfo.coupleInfo;
      const fiance = data.find((element) => element.createdBy !== element.user_id)?.user;
      if (fiance) {
        setFianceDetails(fiance);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupleInfo.isLoading, coupleInfo.isInit]);

  const getSunsetTime = () => (sunsetTime ? moment(sunsetTime).format('LT') : null);

  const getWeddingDate = () => {
    const updatedDate = Number(weddingDetails?.date) * 1000;
    const data = moment(updatedDate).format('YYYY-MM-DD');
    if (data) {
      return moment(data).format('dddd, MMMM DD, yyyy');
    }
  };
  const getRemaining = (wedding_date: number) => {
    const startDateTime = moment();
    const endDateTime = moment.unix(Number(wedding_date));
    const duration = moment.duration(endDateTime.diff(startDateTime));

    const months = Math.floor(duration.asMonths());
    const weeks = Math.floor(duration.asWeeks() % 4);
    const days = Math.floor(duration.asDays() % 7);
    if (months < 1) {
      setMonths('00');
    } else {
      setMonths(String(months).padStart(2, '0'));
    }
    if (weeks < 1) {
      setWeeks('00');
    } else {
      setWeeks(String(weeks).padStart(2, '0'));
    }
    if (days < 1) {
      setDays('00');
    } else {
      setDays(String(days).padStart(2, '0'));
    }
  };

  return (
    <Stack>
      {weddingDetails && userDetails && fianceDetails ? (
        <Grid
          container
          sx={{
            backgroundColor: { lg: '#ffffff', xs: 'transparent' },
            borderRadius: '1rem',
            justifyContent: 'center',
            width: { lg: '100%', xs: '342px' },
            margin: 'auto',
            marginTop: '24px',
          }}
        >
          {isLoading ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              order={{ xs: 2, lg: 1 }}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              padding={{ xs: '1rem', lg: '1rem 2rem' }}
              sx={{
                marginTop: { lg: '0px', xs: '12px' },
                borderRadius: { lg: '0px', xs: '16px' },
                borderTopLeftRadius: '16px',
                borderBottomLeftRadius: '16px',
                borderTopRightRadius: '16px',
                borderBottomRightRadius: '16px',
                backgroundColor: { lg: 'transparent', xs: '#ffffff' },
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
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              order={{ xs: 2, lg: 1 }}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
              padding={{ xs: '1rem', lg: '1rem 2rem' }}
              sx={{
                marginTop: { lg: '0px', xs: '12px' },
                borderRadius: { lg: '0px', xs: '16px' },
                borderTopLeftRadius: '16px',
                borderBottomLeftRadius: '16px',
                borderTopRightRadius: '16px',
                borderBottomRightRadius: '16px',
                backgroundColor: { lg: 'transparent', xs: '#ffffff' },
              }}
            >
              <Stack>
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    color: '#512F6F',
                    fontWeight: '500',
                    fontSize: { lg: '28px', xs: '20px' },
                    lineHeight: '42px',
                    letterSpacing: '1%',
                  }}
                >
                  {userDetails.first_name && fianceDetails.first_name != ''
                    ? userDetails.first_name + ' & ' + fianceDetails.first_name + "'s" + ' Wedding'
                    : ''}
                </Typography>

                <div className="m-1 font-normal text-w_base xl:text-w_0xl text-chinese_black flex flex-row items-center">
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: '400',
                      fontSize: { lg: '18px', xs: '16px' },
                      lineHeight: '27px',
                      color: '#000000',
                    }}
                  >
                    {weddingDetails.date ? getWeddingDate() : 'Wedding Date'}
                  </Typography>

                  <CustomDatePicker
                    value={value}
                    handleChange={handleChange}
                    onDone={onDone}
                    sx={{
                      '& .MuiInputBase-root': {
                        fieldset: {
                          borderWidth: 'none',
                          border: 'none !important',
                        },
                      },
                    }}
                  />
                </div>

                <div className="flex items-center">
                  <div className="mx-1">
                    <Image
                      src="/images/sunset.png"
                      alt="sunset"
                      className="w-[20px] xl:w-[26px] h-[20px] xl:h-[26px]"
                      width={26}
                      height={26}
                    />
                  </div>

                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontSize: { lg: '18px', xs: '16px' },
                      fontWeight: '400',
                      color: '#000000',
                      paddingTop: '1px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Sunset: {sunsetTime ? getSunsetTime() : ''}
                  </Typography>
                </div>
              </Stack>
              <Stack
                direction={'row'}
                sx={{
                  marginTop: { lg: '0px', xs: '24px' },
                }}
              >
                <NewTimeUnit value={`${months}`} unit="Months" color="#B5EAD6" />
                <div className="mx-3">:</div>
                <NewTimeUnit value={`${weeks}`} unit="Weeks" color="#F6EAC2" />
                <div className="mx-3">:</div>
                <NewTimeUnit value={`${days}`} unit="Days" color="#F6EAC2" />
              </Stack>
            </Grid>
          )}
          <Newbanner />
        </Grid>
      ) : (
        <Stack
          sx={{
            display: 'flex',
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
export default memo(NewTopComponent);
