import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Divider } from '@mui/material';
import Image from 'next/image';
import { calculateTimeLeft } from 'utils/date';
import { generateLocationLink, getLocationMarkLogo } from 'utils/location';

type Prop = {
  time: string;
  name: string;
  description?: string;
  start_time_epochs?: number;
  end_time_epochs?: number;
  ind: number;
  itemLength: number;
  heading?: string;
  link?: string;
  address_1?: string;
  address_2?: string;
};
export default function LineItem({
  time,
  name,
  description,
  start_time_epochs,
  end_time_epochs,
  ind,
  itemLength,
  heading,
  link,
  address_1,
  address_2,
}: Prop) {
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ width: '140px', color: '#512F6F', fontWeight: heading ? 600 : 400 }}>
        {heading ? heading : time}
      </TimelineOppositeContent>
      <div className="divide-x "></div>
      <TimelineSeparator>
        <Divider
          orientation="vertical"
          sx={
            ind === 0
              ? {
                  height: '7px',
                  width: '7px',
                  borderRadius: '100%',
                  backgroundColor: '#512F6F',
                  marginTop: '10px',
                }
              : {
                  height: '7px',
                  width: '7px',
                  borderRadius: '100%',
                  backgroundColor: '#512F6F',
                  position: 'absolute',
                  top: '13px',
                }
          }
        />
        <TimelineConnector
          sx={{
            ...(ind === itemLength - 1 && {
              '&.MuiTimelineConnector-root': {
                backgroundColor: '#bdbdbd !important',
                height: itemLength === 1 ? '2.2rem !important' : '1.2rem !important',
                display: 'block',
                flexGrow: 0,
              },
            }),
          }}
        />
        {itemLength === 1 && (
          <Divider
            orientation="vertical"
            sx={{
              height: '7px',
              width: '7px',
              borderRadius: '100%',
              backgroundColor: '#512F6F',
              marginTop: '0px',
            }}
          />
        )}
      </TimelineSeparator>
      {address_1 ? (
        <TimelineContent sx={{ fontWeight: 600, color: '#512F6F', fontSize: '16px', width: '100%', mt: -1 }}>
          {address_1}
          <div className="flex text-purple text-xs underline">
            <div className="w-[14px] h-[12px] relative top-1">
              <Image src={getLocationMarkLogo()} width={10} height={10} alt="logo" />
            </div>
            <div className="max-w-[300px] flex-1">
              <a target="blank" href={generateLocationLink(link!)}>
                {address_2}
              </a>
            </div>
          </div>
        </TimelineContent>
      ) : (
        <TimelineContent>
          {name} {start_time_epochs && end_time_epochs && `(${calculateTimeLeft(start_time_epochs, end_time_epochs)})`}
          <br />
          {description && <span className="text-sm text-glossy_grape"> {description}</span>}
        </TimelineContent>
      )}
    </TimelineItem>
  );
}
