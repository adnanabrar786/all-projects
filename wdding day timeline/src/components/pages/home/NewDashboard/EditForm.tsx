import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AppLoader } from 'components/common/AppLoader';
import MapFieldCopy from 'components/common/MapFieldCopy';
import { CLOCK, DURATIONS, MINUTES, ZONE } from 'constants/time';
import { useFormik } from 'formik';
import { DateTime } from 'luxon';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { WeddingService } from 'services/wedding.service';
import { useWedInfo } from 'state/useWedding';
import { TIMELINE_EVENT_NAME } from 'utils/enums';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import { EditEventValidate } from 'validators';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import DateDropDown from './DateDropDown';
import { DurationDropDown } from './DurationDropDown';
import SwitchButton from './SwitchButton';
import TimeDeleteCard from './TimeDeleteCard';
interface Props {
  deleteBox: boolean;
  setDeleteBox: Dispatch<SetStateAction<boolean>>;
  data: any;
  setExpanded: any;
  timeZone: string;
  expanded: boolean;
}

const EditForm = ({ deleteBox, setDeleteBox, data, setExpanded, expanded, timeZone }: Props) => {
  const [setValue] = useState<google.maps.places.PlaceResult>();
  const weddingService = new WeddingService();
  const { weddingInfo } = useWedInfo();
  const [isPinned, setIsPinned] = useState<boolean>(data.is_pinned);
  const [isMidNightPinned, setIsMidNightPinned] = useState<boolean>(data.is_midnight);
  const [isLoading, setIsLoading] = useState<boolean>();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      event_name: '',
      clock: '',
      minutes: '',
      zone: '',
      duration: '',
    },
    validationSchema: EditEventValidate(),
    onSubmit: async (values) => {
      setIsLoading(true);
      updateEvent.mutate(data.event_name_hidden == TIMELINE_EVENT_NAME.TRAVEL ? updateTravelBody() : updateEventBody());
    },
  });

  const setTime = () => {
    if (weddingInfo && weddingInfo.date) {
      const weddingDate = DateTime.fromSeconds(Number(weddingInfo.date)).toISODate();
      const clock = Number(formik.values.clock);
      const minutes = Number(formik.values.minutes);
      let hour;
      if (clock === 12) {
        hour = formik.values.zone === 'AM' ? 0 : 12;
      } else {
        hour = clock + (formik.values.zone === 'PM' ? 12 : 0);
      }
      let event_time: any = DateTime.fromObject({
        year: Number(weddingDate.split('-')[0]),
        month: Number(weddingDate.split('-')[1]),
        day: Number(weddingDate.split('-')[2]),
        hour,
        minute: minutes,
      });
      event_time = event_time.setZone('GMT').toSeconds();
      if (!isNaN(event_time)) {
        return event_time;
      }
    }
  };

  const makeEventPin = useMutation((body: any) => weddingService.PinEvent(body), {
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries([REACT_QUERY_KEYS.GET_TIMELINE]);
      setIsLoading(false);
      setExpanded(false);
      toast.success(data.data.message);
    },
    onError(error: AxiosError) {
      const err: any = error;
      if (err.response.data.error) {
        toast.error(err.response.data.message);
        setIsLoading(false);
        return;
      }
      toast.error(err.message);
      setIsLoading(false);
    },
  });

  const deleteEvent = useMutation((body: any) => weddingService.DeleteTimelineEvent(body), {
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries([REACT_QUERY_KEYS.GET_TIMELINE]);
      setIsLoading(false);
      setExpanded(false);
      toast.success(data.data.message);
    },
    onError(error: AxiosError) {
      const err: any = error;
      if (err.response.data.error) {
        toast.error(err.response.data.message);
        setIsLoading(false);
        return;
      }
      toast.error(err.message);
      setIsLoading(false);
    },
  });

  const updateEvent = useMutation((body: any) => weddingService.UpdateTimelineEvent(body), {
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries([REACT_QUERY_KEYS.GET_TIMELINE]);
      setIsLoading(false);
      setExpanded(false);
      toast.success('Event Updated');
    },
    onError(error: AxiosError) {
      const err: any = error;
      if (err.response.data.error) {
        toast.error(err.response.data.message);
        setIsLoading(false);
        return;
      }
      toast.error(err.message);
      setIsLoading(false);
    },
  });

  const createPinnedEventBody = (status) => {
    const body = {
      data: {
        event_id: data.id,
        status,
      },
    };
    return body;
  };

  const millisecondsToMinutes = (milliseconds: number) => {
    return milliseconds / 60000;
  };

  const minutesToMilliseconds = (minutes) => {
    return minutes * 60000;
  };

  const deleteEventBody = () => {
    const body = {
      data: {
        event_id: data.id,
      },
    };
    return body;
  };

  const updateEventBody = () => {
    const event_time = setTime();
    const duration = minutesToMilliseconds(Number(formik.values.duration));
    const body = {
      data: {
        event_id: data.id,
        start_time: event_time,
        duration: Number(duration),
        event_name: formik.values.event_name,
        is_midnight: isMidNightPinned,
      },
    };
    return body;
  };

  const updateTravelBody = () => {
    const buffer = minutesToMilliseconds(Number(formik.values.duration));
    const body = {
      data: {
        event_id: data.id,
        start_time: data.start_time,
        origin: data.origin,
        dest: data.dest,
        buffer: Number(buffer),
      },
    };
    return body;
  };

  const handleSwitchChange = (e) => {
    setIsPinned(e.target.checked);
    setIsLoading(true);
    setIsMidNightPinned(false);
    makeEventPin.mutate(createPinnedEventBody(e.target.checked));
  };

  const handleIsMidNightSwitchChange = (e) => {
    setIsMidNightPinned(e.target.checked);
  };

  useEffect(() => {
    if (data) {
      formik.setFieldValue('event_name', data.event_name);
      const weddingDateTimeUTC = DateTime.fromSeconds(Number(data.start_time)).setZone(timeZone);
      const hour = weddingDateTimeUTC.hour;
      const minutes = weddingDateTimeUTC.minute;
      let zone, clock;
      if (hour === 0) {
        clock = 12;
        zone = 'AM';
      } else if (hour < 12) {
        clock = hour;
        zone = 'AM';
      } else if (hour === 12) {
        clock = 12;
        zone = 'PM';
      } else {
        clock = hour - 12;
        zone = 'PM';
      }

      formik.setFieldValue('clock', String(clock));
      formik.setFieldValue('zone', zone);
      if (data.event_name_hidden == TIMELINE_EVENT_NAME.TRAVEL) {
        const buffer = millisecondsToMinutes(data.buffer);
        const isValidBuffer = DURATIONS.some((item) => item.id === buffer);
        const bufferValue = isValidBuffer ? buffer : 5;
        formik.setFieldValue('duration', String(bufferValue));
      } else {
        const duration = millisecondsToMinutes(data.event_duration);
        const isValidDuration = DURATIONS.some((item) => item.id === duration);
        const durationValue = isValidDuration ? duration : 5;
        formik.setFieldValue('duration', String(durationValue));
      }
      if (minutes === 0) {
        formik.setFieldValue('minutes', '00');
        return;
      }
      formik.setFieldValue('minutes', String(minutes));
    }
  }, [data, expanded]);

  const handleSubmit = async () => {
    setDeleteBox(false);
    setIsLoading(true);
    deleteEvent.mutate(deleteEventBody());
  };

  const cancelClicked = () => {
    setExpanded(false);
    formik.setErrors({
      event_name: '',
      clock: '',
      minutes: '',
      zone: '',
      duration: '',
    });
  };

  useEffect(() => {
    if (!expanded) {
      formik.setErrors({
        event_name: '',
        clock: '',
        minutes: '',
        zone: '',
        duration: '',
      });
      formik.setFieldValue('event_name', data.event_name);
    }
  }, [expanded]);

  return (
    <Stack
      sx={{
        gap: '16px',
        padding: '16px 16px',
      }}
      component={'form'}
      onSubmit={formik.handleSubmit}
    >
      <Stack
        sx={{
          gap: '4px',
        }}
      >
        {data.event_name_hidden == TIMELINE_EVENT_NAME.TRAVEL ? (
          <>
            <Typography sx={{ fontSize: '12px' }}>Start</Typography>
            <Stack sx={{ backgroundColor: 'white', borderRadius: '100px' }}>
              <MapFieldCopy
                setIsLoading={setIsLoading}
                icon={true}
                val={data.origin.name}
                setValue={setValue}
                disabled={true}
                sx={{
                  py: '6px',
                  pl: '16px',
                  flexDirection: 'row',
                  alignItems: 'center',
                  boxShadow: 'none',
                }}
                inputStyle={{
                  border: 'none',
                  outline: 'none',
                  paddingLeft: '0.75rem',
                }}
              />
            </Stack>
            <Box sx={{ mt: '24px' }}>
              <Typography sx={{ fontSize: '12px' }}>Destination</Typography>
              <Stack sx={{ backgroundColor: 'white', borderRadius: '100px' }}>
                <MapFieldCopy
                  setIsLoading={setIsLoading}
                  icon={true}
                  val={data.dest.name}
                  setValue={setValue}
                  disabled={true}
                  sx={{
                    py: '6px',
                    pl: '16px',
                    flexDirection: 'row',
                    alignItems: 'center',
                    boxShadow: 'none',
                  }}
                  inputStyle={{
                    border: 'none',
                    outline: 'none',
                    paddingLeft: '0.75rem',
                  }}
                />
              </Stack>
            </Box>
            <Box sx={{ mt: '24px' }}>
              <Typography sx={{ fontSize: '12px' }}>Change buffer time</Typography>
              <Stack>
                <DurationDropDown
                  name="duration"
                  handleChange={(e) => {
                    formik.setFieldValue('duration', e.target.value);
                  }}
                  selected={formik.values.duration}
                  label="duration"
                  list={DURATIONS.map((item) => ({
                    id: String(item.id),
                    label: item.label,
                  }))}
                  sx={{
                    width: '100%',
                    padding: '6px 0px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                  }}
                  error={formik.touched.duration ? formik.errors.duration : ''}
                />
                <Stack>
                  {formik.touched.minutes && (
                    <CustomText
                      text={formik.errors.minutes}
                      sx={{
                        fontFamily: 'Poppins',
                        color: '#FF0000',
                        fontSize: '13px',
                        marginLeft: '15px',
                      }}
                    />
                  )}
                </Stack>
              </Stack>
            </Box>
          </>
        ) : (
          <>
            <CustomText
              text="Edit Event Name"
              sx={{
                fontSize: '12px',
                lineHeight: '18px',
                fontWeight: '600',
              }}
            />
            <TextField
              disabled={isPinned}
              placeholder="Event Name"
              value={formik.values.event_name}
              onChange={(e) => {
                formik.setFieldValue('event_name', e.target.value);
              }}
              sx={{
                '& .MuiInputBase-root': {
                  fieldset: {
                    borderWidth: 'none',
                    border: 'none !important',
                  },
                  input: {
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '18px',

                    padding: '13px',
                  },
                },
                padding: '0px',
                margin: '0px',
                border: '1px solid #EAEAEA !important',
                borderRadius: '60px',
                width: '19.25rem',
                height: '2.8125rem',
                backgroundColor: '#ffffff',
                'input::placeholder': {
                  fontSize: '12px',
                  color: '#333333',
                  fontWeight: '400',
                },
                paddingLeft: '8px',
              }}
            />
            <Stack>
              {formik.touched.event_name && formik.touched.event_name ? (
                <CustomText
                  text={formik.errors.event_name}
                  sx={{
                    fontFamily: 'Poppins',
                    color: '#FF0000',
                    fontSize: '13px',
                    marginLeft: '15px',
                  }}
                />
              ) : null}
            </Stack>
            <Stack
              sx={{
                gap: '4px',
              }}
            >
              <CustomText
                text="Edit Event Time & Duration"
                sx={{
                  fontSize: '12px',
                  lineHeight: '18px',
                  fontWeight: '600',
                }}
              />

              <Stack
                direction={'row'}
                sx={{
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                <Stack>
                  <DateDropDown
                    list={CLOCK}
                    placeholder="01"
                    isPinned={isPinned}
                    value={formik.values.clock}
                    IconComponent={KeyboardArrowDownIcon}
                    onChange={(event) => formik.setFieldValue('clock', event.target.value)}
                    sx={{
                      width: '5.4375rem',
                      height: '2.8125rem',
                      outline: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      '& fieldset': { border: 'none' },
                    }}
                  />
                  <Stack>
                    {formik.touched.clock && (
                      <CustomText
                        text={formik.errors.clock}
                        sx={{
                          fontFamily: 'Poppins',
                          color: '#FF0000',
                          fontSize: '13px',
                          marginLeft: '15px',
                        }}
                      />
                    )}
                  </Stack>
                </Stack>

                <Stack
                  sx={{
                    width: '5.435rem',
                    height: '2.8125rem',
                  }}
                >
                  <DateDropDown
                    list={MINUTES}
                    placeholder="01"
                    isPinned={isPinned}
                    value={formik.values.minutes}
                    IconComponent={KeyboardArrowDownIcon}
                    onChange={(event) => formik.setFieldValue('minutes', event.target.value)}
                    sx={{
                      width: '5.4375rem',
                      height: '2.8125rem',
                      outline: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      '& fieldset': { border: 'none' },
                    }}
                  />
                  <Stack>
                    {formik.touched.minutes && (
                      <CustomText
                        text={formik.errors.minutes}
                        sx={{
                          fontFamily: 'Poppins',
                          color: '#FF0000',
                          fontSize: '13px',
                          marginLeft: '15px',
                        }}
                      />
                    )}
                  </Stack>
                </Stack>
                <Stack>
                  <DateDropDown
                    list={ZONE}
                    isPinned={isPinned}
                    value={formik.values.zone}
                    IconComponent={KeyboardArrowDownIcon}
                    onChange={(event) => formik.setFieldValue('zone', event.target.value)}
                    placeholder="AM"
                    sx={{
                      width: '5.4375rem',
                      height: '2.8125rem',
                      outline: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      '& fieldset': { border: 'none' },
                    }}
                  />
                  <Stack>
                    {formik.touched.zone && (
                      <CustomText
                        text={formik.errors.zone}
                        sx={{
                          fontFamily: 'Poppins',
                          color: '#FF0000',
                          fontSize: '13px',
                          marginLeft: '15px',
                        }}
                      />
                    )}
                  </Stack>
                </Stack>
                <Stack>
                  <DurationDropDown
                    name="duration"
                    label="duration"
                    selected={formik.values.duration}
                    error={formik.touched.duration ? formik.errors.duration : ''}
                    handleChange={(e) => {
                      formik.setFieldValue('duration', e.target.value);
                    }}
                    list={DURATIONS.map((item) => ({
                      id: String(item.id),
                      label: item.label,
                    }))}
                    sx={{
                      width: '11.0625rem',
                      height: '2.8125rem',
                      outline: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      '& fieldset': { border: 'none' },
                    }}
                    disabled={
                      data.event_name_hidden == TIMELINE_EVENT_NAME.RECEPTION_START ||
                      data.event_name_hidden == TIMELINE_EVENT_NAME.RECEPTION_END ||
                      isPinned
                    }
                  />
                  <Stack>
                    {formik.touched.duration && (
                      <CustomText
                        text={formik.errors.duration}
                        sx={{
                          fontFamily: 'Poppins',
                          color: '#FF0000',
                          fontSize: '13px',
                          marginLeft: '15px',
                        }}
                      />
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Stack>
              <Stack
                direction={'row'}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <CustomText
                  text="Pin This Event"
                  sx={{
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontWeight: '600',
                    color: '#333333',
                  }}
                />

                <SwitchButton
                  switchHandler={
                    formik.values.event_name === TIMELINE_EVENT_NAME.SUNSET && isPinned ? null : handleSwitchChange
                  }
                  value={isPinned}
                />
              </Stack>

              <CustomText
                text="Locks event in place. Will not be affected by other events."
                sx={{
                  fontSize: '10px',
                  lineHeight: '15px',
                  fontWeight: '400',
                  color: '#000000',
                  opacity: '80%',
                }}
              />

              <Stack
                direction={'row'}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <CustomText
                  text="This Event is After Midnight"
                  sx={{
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontWeight: '600',
                    color: '#333333',
                  }}
                />

                <SwitchButton
                  disabled={isPinned ? true : false}
                  switchHandler={
                    formik.values.event_name === TIMELINE_EVENT_NAME.CEREMONY && !isMidNightPinned
                      ? null
                      : handleIsMidNightSwitchChange
                  }
                  value={isMidNightPinned}
                  sx={{
                    '& .MuiSwitch-switchBase': {
                      padding: 0,
                      margin: 'auto',
                      transitionDuration: '300ms',
                      '&.Mui-checked': {
                        transform: 'translateX(16px)',
                        color: '#2196F3',
                        '& .MuiSwitch-thumb': {
                          color: '#2196F3',
                        },
                        '& + .MuiSwitch-track': {
                          border: 0,
                          opacity: 1,
                        },
                        '&.Mui-disabled + .MuiSwitch-track': {
                          opacity: 0.5,
                        },
                      },
                      '&.Mui-focusVisible .MuiSwitch-thumb': {
                        border: '6px solid #2196F3',
                        color: '#2196F3',
                      },
                      '&.Mui-disabled + .MuiSwitch-track': {
                        opacity: 1,
                      },
                      '&.Mui-disabled .MuiSwitch-thumb': {
                        color: '#B0B0B0',
                      },
                    },
                  }}
                />
              </Stack>
            </Stack>
          </>
        )}
      </Stack>

      {isLoading && (
        <AppLoader
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
          }}
          size={40}
        />
      )}

      {!deleteBox && !isLoading && (
        <>
          <Stack
            sx={{
              gap: '12px',
            }}
          >
            <CustomButton
              disabled={isPinned}
              sx={{
                color: '#ffff',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '24px',
                backgroundColor: isPinned ? '#b0b0b0 !important' : '#5AD3BD !important',
                border: isPinned ? '1px solid #b0b0b0 !important' : '1px solid #5AD3BD !important',
                '&:active': {
                  backgroundColor: '#00CAA5 !important',
                  border: '1px solid #00CAA5 !important',
                },
              }}
            >
              Save Changes
            </CustomButton>
            <CustomButton
              type="button"
              onClick={cancelClicked}
              sx={{
                backgroundColor: '#ffffff !important',
                border: '1px solid #00CAA5 !important',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '24px',
                color: '#5AD3BD !important',
                '&:active': {
                  backgroundColor: '#00CAA5 !important',
                  border: '1px solid #fff !important',
                  color: '#fff !important',
                },
              }}
            >
              Cancel
            </CustomButton>
          </Stack>

          <Stack
            sx={{
              alignItems: 'center',
            }}
            onClick={!isPinned ? () => setDeleteBox(true) : undefined}
          >
            {!isPinned && (
              <CustomText
                text=" Delete Event"
                sx={{
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: '#FF5449',
                  cursor: 'pointer',
                  fontWeight: '400',
                }}
              />
            )}
          </Stack>
        </>
      )}

      {deleteBox && <TimeDeleteCard onClick={() => setDeleteBox(false)} handleSubmit={handleSubmit} />}
    </Stack>
  );
};

export default EditForm;
