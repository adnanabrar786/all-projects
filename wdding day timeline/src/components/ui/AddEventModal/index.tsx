import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AppLoader } from 'components/common/AppLoader';
import AppModal from 'components/common/AppModal';
import CreatableAutocomplete from 'components/common/CreatableAutocomplete';
import { Dropdown } from 'components/common/DropDown';
import { CLOCK, MINUTES, ZONE } from 'constants/time';
import { useFormik } from 'formik';
import { IAddTimelineEvent } from 'interfaces/wedding';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { WeddingService } from 'services/wedding.service';
import { useStoreWeddingTimeline } from 'state/useWeddingTimeline';
import { TimelineEventType, TimelineType } from 'utils/enums';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import { AppText, ButtonText } from 'utils/enums/text';
import { errorToast } from 'utils/toast';

type EventModal = {
  open: boolean;
  handleClose: () => void;
  openSuccessModal: () => void;
  heading1: string;
  heading2: string;
  timelineEvents;
  weddingDetails?;
  timeline_type: TimelineType;
  setTimelineTypeShuffled: ({ main_div, child_div }) => void;
};

const AddEventModal = ({
  open,
  handleClose,
  heading1,
  heading2,
  openSuccessModal,
  timelineEvents,
  weddingDetails,
  timeline_type,
  setTimelineTypeShuffled,
}: EventModal) => {
  const [event, setEvent] = useState(null);
  const weddingService = new WeddingService();
  const { fetchWeddingTimelineInfo } = useStoreWeddingTimeline();
  const duration = [
    { id: 5, label: '5 minutes' },
    { id: 10, label: '10 minutes' },
    { id: 15, label: '15 minutes' },
    { id: 20, label: '20 minutes' },
    { id: 25, label: '25 minutes' },
    { id: 30, label: '30 minutes' },
    { id: 35, label: '35 minutes' },
    { id: 40, label: '40 minutes' },
    { id: 45, label: '45 minutes' },
    { id: 50, label: '50 minutes' },
    { id: 55, label: '55 minutes' },
    { id: 60, label: '60 minutes' },
    { id: 90, label: '90 minutes' },
    { id: 12, label: '120 minutes' },
    { id: 18, label: '180 minutes' },
  ];

  function dateTimeSetter(hrs: number, min: number, zone: string) {
    const weddingDate = moment.unix(weddingDetails.date);
    const hour = zone === 'pm' ? hrs + 12 : hrs;
    return moment()
      .set({
        year: weddingDate.year(),
        month: weddingDate.month(),
        date: weddingDate.date(),
        hour: hour,
        minutes: min,
      })
      .utc()
      .unix();
  }

  const minuteToUnix = (num: number): number => {
    return num * 60 * 1000;
  };

  const eventData = timelineEvents.map((event) => {
    return { title: event.EVENT_NAME, type: event.EVENT_TYPE };
  });

  const [customEventSelected, setCustomEventSelected] = useState(false);
  const formik = useFormik<{
    event: null | { event_name: string; event_type: TimelineEventType };
    zone: '';
    duration: '';
    hours: '';
    minutes: '';
  }>({
    initialValues: {
      event: null,
      duration: '',
      hours: '',
      minutes: '',
      zone: '',
    },
    onSubmit: (values) => {
      let duration: number;
      if (values.event && values.event.event_type === TimelineEventType.CUSTOM) {
        duration = dateTimeSetter(Number(values.hours), Number(values.minutes), values.zone);
      } else {
        duration = minuteToUnix(Number(values.duration));
      }

      const body = {
        data: {
          event: values.event,
          duration: duration,
          timeline_type: timeline_type,
        },
      };
      addTimelineEvent.mutate(body);
    },
  });

  const setEventByFormik = useCallback(() => {
    formik.setFieldValue('event', event);
  }, [event]);

  useEffect(() => {
    setEventByFormik();
  }, [event, setEventByFormik]);

  const queryClient = useQueryClient();

  const addTimelineEvent = useMutation((body: IAddTimelineEvent) => weddingService.AddTimelineEvent(body), {
    onSuccess: (res) => {
      openSuccessModal();
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.GET_TIMELINE],
      });
      fetchWeddingTimelineInfo();
      if (res && res.data && res.data.data) {
        setTimelineTypeShuffled({
          main_div: res.data.data.item.timeline_type,
          child_div: res.data.data.item.ordering.toString(),
        });
      }
    },

    onError: (error: AxiosError) => {
      errorToast(error.response!.data as string);
    },
  });

  return (
    <>
      <AppModal
        open={open}
        onClose={handleClose}
        className="absolute rounded-3xl top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[75%] md:w-[55%] lg:w-[40%] block overflow-auto bg-white outline-none overflow-y-auto  h-[55%]"
      >
        <div>
          <div className="flex flex-col justify-center items-center px-6 mb-4">
            <p className="text-xl xl:text-2xl text-purple font-medium">{heading1}</p>
            <p className="mt-2 text-[10px] xl:text-xs text-center text-purple font-medium"> {heading2}</p>
          </div>
          <div className="text-w_sm xl:text-base text-gray-700 font-medium mx-4 sm:mx-10">{AppText.SELECT_EVENT}</div>
          <div className="flex justify-center">
            <div className="w-full pl-2 pr-4 sm:pl-8 sm:pr-6 pt-2">
              <CreatableAutocomplete setSelected={setCustomEventSelected} setEvent={setEvent} data={eventData} />
            </div>
          </div>
          {!customEventSelected ? (
            <>
              <div className="grid grid-cols-12 gap-2 px-4 sm:px-8 mt-6">
                <div className="w-full sm:ml-2 col-span-12 sm:col-span-6">
                  <p className="text-w_sm xl:text-base text-gray-700 font-medium mb-2">{AppText.EVENT_DURATION}</p>
                  <Dropdown
                    name="duration"
                    handleChange={(e) => {
                      formik.setFieldValue('duration', e.target.value);
                    }}
                    selected={formik.values.duration}
                    label="Duration"
                    list={duration.map((item) => ({
                      id: String(item.id),
                      label: item.label,
                    }))}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-2 px-4 sm:px-8 mt-6">
                <div className="w-full sm:ml-2">
                  <p className="text-w_sm xl:text-base text-gray-700 font-medium mb-2">{AppText.SET_TIME}</p>
                  <div className="grid grid-cols-12 gap-2 sm:gap-2">
                    <div className="col-span-4 sm:col-span-3">
                      <Dropdown
                        name="hours"
                        handleChange={(e) => {
                          formik.setFieldValue('hours', e.target.value);
                        }}
                        selected={formik.values.hours}
                        label="hours"
                        list={CLOCK.map((item) => ({
                          id: String(item.id),
                          label: item.label,
                        }))}
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3">
                      <Dropdown
                        name="minutes"
                        handleChange={(e) => {
                          formik.setFieldValue('minutes', e.target.value);
                        }}
                        selected={formik.values.minutes}
                        label="minutes"
                        list={MINUTES.map((item) => ({
                          id: String(item.id),
                          label: item.label,
                        }))}
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3">
                      <Dropdown
                        name="zone"
                        handleChange={(e) => {
                          formik.setFieldValue('zone', e.target.value);
                        }}
                        selected={formik.values.zone}
                        label="zone"
                        list={ZONE.map((item) => ({
                          id: String(item.id),
                          label: item.label,
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {addTimelineEvent.isLoading ? (
            <AppLoader
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '40px',
                color: '#00D5D4',
              }}
              size={40}
            />
          ) : (
            <div className="sm:flex justify-center gap-10 my-8 mr-1 px-5">
              <div
                className="flex justify-center cursor-pointer border border-secondary rounded-full py-3 w-full sm:w-2/6"
                onClick={handleClose}
              >
                <div className="text-w_sm xl:text-base flex justify-center items-center h-4 xl:h-5 font-medium text-secondary">
                  {ButtonText.CANCEL}
                </div>
              </div>
              <div
                className="flex justify-center cursor-pointer bg-secondary text-white rounded-full mt-6 sm:mt-0 py-3 w-full sm:w-2/6"
                onClick={() => {
                  formik.submitForm();
                }}
              >
                <div className="flex justify-center font-medium text-w_2xl xl:text-2xl mr-2">
                  <IoIosAddCircleOutline />
                </div>
                <div className="text-w_sm xl:text-base flex justify-center items-center h-4 xl:h-5 font-medium text-white">
                  {ButtonText.ADD_EVENT}
                </div>
              </div>
            </div>
          )}
        </div>
      </AppModal>
    </>
  );
};
export default AddEventModal;
