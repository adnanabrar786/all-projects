import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MapFieldCopy from 'components/common/MapFieldCopy';
import { AddTimeLineTitle, addTravelData } from 'constants/constants';
import { CLOCK, MINUTES, ZONE } from 'constants/time';
import { useFormik } from 'formik';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { WeddingService } from 'services/wedding.service';
import { useWedInfo } from 'state/useWedding';
import { TIMELINE_EVENT_NAME, TimelineType } from 'utils/enums';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import { AddEventValidate } from 'validators';
import AddCardLayout from './AddCardLayout';
import CustomText from './CustomText';
import DateDropDown from './DateDropDown';
import SwitchButton from './SwitchButton';

interface Props {
  showTimeLineModal: boolean;
  setShowTimeLineModal: () => void;
  type: TimelineType;
  isFirstLook: boolean;
}

const AddEventCard = ({ setShowTimeLineModal, type, isFirstLook }: Props) => {
  const { weddingInfo } = useWedInfo();
  const weddingService = new WeddingService();
  const [showEvent, setShowEvent] = useState(false);
  const [showTravelEvent, setShowTravelEvent] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [isMidNightPinned, setIsMidNightPinned] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      event_name: '',
      clock: '',
      minutes: '',
      zone: '',
    },
    validationSchema: AddEventValidate(),
    onSubmit: async (values) => {
      setIsLoading(true);
      addTimelineEvent.mutate(addTimelineEventBody());
    },
  });

  const addTimelineEvent = useMutation((body: any) => weddingService.AddTimelineEvent(body), {
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries([REACT_QUERY_KEYS.GET_TIMELINE]);
      setIsLoading(false);
      setShowEvent(false);
      toast.success(data.data.message);
      formik.resetForm();
    },
    onError(error) {
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

  const addTimelineEventBody = () => {
    const event_time = setTime();
    const body = {
      data: {
        event: {
          event_name: formik.values.event_name,
          is_midnight: isMidNightPinned,
        },
        start_time: Number(event_time),
        timeline_type: type,
      },
    };
    return body;
  };

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

  const handleClick = (id) => {
    switch (id) {
      case 0:
        setShowEvent(true);
        break;
      case 1:
        setShowTimeLineModal();
        break;
      case 2:
        setShowTimeLineModal();
        break;
      default:
        break;
    }
  };

  const dropDownStyles = {
    width: '5.4375rem',
    height: 'auto',
  };

  const handleIsMidNightSwitchChange = (e) => {
    setIsMidNightPinned(e.target.checked);
  };

  return (
    <Stack>
      <Stack>
        {!showEvent && !showTravelEvent && (
          <Stack
            direction={'row'}
            sx={{
              // borderTop: { lg: 'none', xs: '1px solid #EAEAEA' },
              // borderBottom: '1px solid #EAEAEA',
              borderBottom: '1px solid #EAEAEA',
              borderTop: '1px solid #EAEAEA',
            }}
          >
            {AddTimeLineTitle.map((title, index) => (
              <Stack
                key={index}
                sx={{
                  padding: '16px 8px',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Stack
                  onClick={() => handleClick(index)}
                  direction={'row'}
                  sx={{
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <Image src="/images/dashboard/addEvent.svg" alt="" width={12} height={12} />
                  <CustomText
                    text={
                      title === TIMELINE_EVENT_NAME.FIRST_LOOK ? (isFirstLook ? 'No First Look' : 'First Look') : title
                    }
                    sx={{
                      fontSize: '12px',
                      color: '#000000',
                      opacity: '60%',
                      lineHeight: '18px',
                    }}
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>

      {showEvent && (
        <AddCardLayout
          sxButtonContainer={{
            marginTop: '10px',
          }}
          formik={formik}
          showEvent={showEvent}
          setShowEvent={setShowEvent}
          title={'Add Event'}
          handleSubmit={formik.handleSubmit}
          IsLoading={IsLoading}
          addEventCancelBtn={true}
        >
          <Stack
            sx={{
              gap: '10px',
            }}
          >
            <Stack
              sx={{
                gap: '4px',
              }}
            >
              <CustomText
                text="Name of Event"
                sx={{
                  fontSize: '12px',
                  lineHeight: '18px',
                  fontWeight: '600',
                }}
              />
              <TextField
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
                      height: '6px',
                    },
                    'input::placeholder': {
                      fontSize: '12px',
                      color: 'rgba(51, 51, 51, 1)',
                      fontWeight: '400',
                      lineHeight: '18px',
                    },
                  },
                  padding: '0px',
                  margin: '0px',
                  border: '1px solid #EAEAEA !important',
                  borderRadius: '60px',
                  backgroundColor: '#ffffff',
                }}
              />
              <Stack>
                {formik.touched.event_name && formik.touched.event_name ? (
                  <CustomText
                    text={formik.errors.event_name ?? ''}
                    sx={{
                      fontFamily: 'Poppins',
                      color: '#FF0000',
                      fontSize: '13px',
                      marginLeft: '15px',
                    }}
                  />
                ) : null}
              </Stack>
            </Stack>

            <Stack
              sx={{
                gap: '4px',
              }}
            >
              <CustomText
                text="Clock Time of Event "
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
                  justifyContent: 'space-around',
                }}
              >
                <Stack sx={dropDownStyles}>
                  <DateDropDown
                    value={formik.values.clock}
                    onChange={(event) => formik.setFieldValue('clock', event.target.value)}
                    IconComponent={KeyboardArrowDownIcon}
                    list={CLOCK}
                    sx={{
                      width: '5.4375rem',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',

                      '& fieldset': {
                        width: '5.4375rem',
                        height: '2.55rem',
                      },
                    }}
                  />
                  <Stack>
                    {formik.touched.clock && (
                      <CustomText
                        text={formik.errors.clock ?? ''}
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

                <Stack sx={dropDownStyles}>
                  <DateDropDown
                    value={formik.values.minutes}
                    onChange={(event) => formik.setFieldValue('minutes', event.target.value)}
                    IconComponent={KeyboardArrowDownIcon}
                    list={MINUTES}
                    sx={{
                      width: '5.4375rem',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',

                      '& fieldset': {
                        width: '5.4375rem',
                        height: '2.55rem',
                      },
                    }}
                  />
                  <Stack>
                    {formik.touched.minutes && (
                      <CustomText
                        text={formik.errors.minutes ?? ''}
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

                <Stack sx={dropDownStyles}>
                  <DateDropDown
                    value={formik.values.zone}
                    onChange={(event) => formik.setFieldValue('zone', event.target.value)}
                    IconComponent={KeyboardArrowDownIcon}
                    list={ZONE}
                    sx={{
                      width: '5.4375rem',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',

                      '& fieldset': {
                        width: '5.4375rem',
                        height: '2.55rem',
                      },
                    }}
                  />
                  <Stack>
                    {formik.touched.minutes && (
                      <CustomText
                        text={formik.errors.zone ?? ''}
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
              <SwitchButton switchHandler={handleIsMidNightSwitchChange} value={isMidNightPinned} />
            </Stack>
          </Stack>
        </AddCardLayout>
      )}

      {showTravelEvent && (
        <AddCardLayout
          showEvent={showTravelEvent}
          setShowEvent={setShowTravelEvent}
          title={'Add Travel'}
          handleSubmit={formik.handleSubmit}
          IsLoading={IsLoading}
        >
          <Stack
            sx={{
              gap: '16px',
            }}
          >
            {addTravelData.map((val, index) => (
              <Stack
                key={index}
                sx={{
                  gap: '4px',
                }}
              >
                <CustomText
                  text={val.label}
                  sx={{
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontWeight: '600',
                  }}
                />
                <MapFieldCopy
                  // TODO
                  // setIsLoading={setIsLoading}
                  // val={getMapValueCopy(LocationValue)}
                  // setValue={setValue}
                  icon={true}
                  sx={{
                    padding: '1.2rem 1rem',
                    flexDirection: 'row',
                    alignItems: 'center',
                    boxShadow: 'none !important',
                    backgroundColor: '#ffffff',
                    borderRadius: '60px',
                    height: '45px',
                    border: '1px solid #0000000A',
                  }}
                  inputStyle={{
                    border: 'none',
                    outline: 'none',
                    paddingLeft: '0.75rem',
                  }}
                />
              </Stack>
            ))}
          </Stack>
        </AddCardLayout>
      )}
    </Stack>
  );
};

export default AddEventCard;
