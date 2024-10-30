// import { NavbarList } from '@/components/config/interface';
import { AccordionDetails, Box, Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { TIMELINE_EVENT_NAME } from 'utils/enums';
import { TEvent } from 'utils/types/timeline';
import CustomText from './CustomText';
import EditForm from './EditForm';

interface Props {
  name: string;
  data: TEvent;
  zone: string;
  index: number;
}

const TimeLineAccordion = ({ name, data, zone, index }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);

  const getLocalTime = (time: number) => {
    if (time) {
      const date = DateTime.fromSeconds(time).setZone(zone);
      return date.toFormat('h:mm a');
    }
  };

  const getPrimaryEventName = useCallback((name, item: TEvent) => {
    if (item.event_name === TIMELINE_EVENT_NAME.GETITNG_DRESSED) {
      if (item.couple_type === 'Groom') {
        return name + ' & ' + 'groomsmen get dressed';
      }
      if (item.couple_type !== 'Groom') {
        return name + ' gets dressed';
      }
      return name + ' ' + item.event_name;
    }

    return item.event_name;
  }, []);

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  const isOdd = index % 2 !== 0;

  return (
    <Stack
      key={index}
      sx={{
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
      }}
    >
      <Accordion
        elevation={0}
        expanded={expanded}
        onChange={handleAccordionToggle}
        sx={{
          width: '100%',
          position: 'relative',
          '::before': {
            backgroundColor: 'transparent',
          },
          '.MuiButtonBase-root': {
            margin: '0px',
            padding: '0px',
          },
          '& .MuiPaper-root . MuiPaper-elevation': {
            marginTop: '0px',
            margin: '0px',
          },
          '&.Mui-expanded': {
            margin: '0px',
          },
          '.MuiAccordionDetails-root': {
            width: '100% !important',
          },
        }}
      >
        <AccordionSummary
          sx={{
            '&.Mui-expanded': {
              minHeight: '40px',
            },

            '& .Mui-expanded': {
              marginY: '0px',
            },

            '& .MuiAccordionSummary-content': {
              marginTop: '0px',
              margin: '0px',
            },
            backgroundColor: expanded ? 'rgba(243, 243, 243, 1)' : isOdd ? 'white' : '#00CAA508',
            width: '100%',
          }}
        >
          <Stack
            direction={'row'}
            sx={{
              justifyContent: 'space-between',
              width: '100%',
              minHeight: '53px',
              alignItems: 'center',
              padding: '0px 16px',
            }}
          >
            <Stack
              direction={'row'}
              sx={{
                gap: '21px',
              }}
            >
              <Stack
                direction={'row'}
                sx={{
                  gap: '21px',
                  width: '3.5rem',
                }}
              >
                <CustomText
                  text={getLocalTime(data.start_time)}
                  sx={{
                    fontSize: '12px',
                    color: '#000000',
                    lineHeight: '18px',
                  }}
                />
              </Stack>
              {data.is_pinned ? (
                <Image src="/images/dashboard/pinned.svg" alt="" width={8} height={8} />
              ) : (
                <Box sx={{ width: '8px', height: '8px' }} />
              )}

              <Stack>
                <CustomText
                  text={getPrimaryEventName(name, data)}
                  sx={{
                    fontSize: '12px',
                    color: '#000000',
                    lineHeight: '18px',
                    fontWeight: expanded ? '500' : '400',
                  }}
                />
              </Stack>
            </Stack>

            {expanded ? (
              <Image src="/images/dashboard/upArrow.svg" alt="" width={11} height={5} />
            ) : (
              <Image src="/images/dashboard/downArrow.svg" alt="" width={11} height={5} />
            )}
          </Stack>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: '0px',
            width: '100%',
            backgroundColor: expanded ? 'rgba(243, 243, 243, 1)' : '',
          }}
        >
          <Stack
            sx={{
              padding: '0px 0px 16px 0px',
            }}
          >
            <Stack
              sx={{
                gap: '13px',
                borderBottom: '1px solid #B0B0B0',
                padding: '10px 16px 16px 16px',
              }}
            >
              <Stack
                direction={'row'}
                sx={{
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Image src="/images/dashboard/clock.svg" alt="" width={16} height={16} />
                <CustomText
                  text={getLocalTime(data.start_time) + ' - ' + getLocalTime(data.end_time)}
                  sx={{
                    fontSize: '12px',
                    color: '#000000',
                    lineHeight: '18px',
                  }}
                />
              </Stack>
              <Stack
                direction={'row'}
                sx={{
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Image src="/images/dashboard/location.svg" alt="" width={16} height={16} />
                <CustomText
                  text={
                    data.event_name_hidden === 'Travel + Buffer'
                      ? data?.origin?.name + ' - ' + data.dest!.name
                      : data?.origin?.name
                  }
                  sx={{
                    fontSize: '12px',
                    color: '#000000',
                    lineHeight: '18px',
                  }}
                />
              </Stack>
            </Stack>
            <EditForm
              expanded={expanded}
              deleteBox={deleteBox}
              setDeleteBox={setDeleteBox}
              data={data}
              setExpanded={setExpanded}
              timeZone={zone}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default TimeLineAccordion;
