import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Divider } from '@mui/material';
import PdfLayout from 'components/common/PdfLayout';
import useEffectOnce from 'hooks/useEffectOnce';
import Image from 'next/image';
import { Fragment } from 'react';
import { calculateTimeLeft } from 'utils/date';
import { generateLocationLink, getLocationMarkLogo } from 'utils/location';

export default function ReceptionPdf({ pdfType, setPdfType, reception_data, locations_data }) {
  useEffectOnce(() => {
    const WebFontLoader = require('webfontloader');
    WebFontLoader.load({
      google: {
        families: ['Playball'],
      },
    });
  });

  if (locations_data && locations_data.locations) {
    const filteredLocation = locations_data.locations.find((item) => item.heading === 'Reception');
    if (filteredLocation && typeof filteredLocation.link != 'undefined') {
      filteredLocation.heading = 'Location';
      reception_data.reception_items.unshift(filteredLocation);
    }
  }

  return (
    <div className="flex justify-center bg-white min-h-[100vh] w-full">
      {reception_data && (
        <div className="w-[90%] sm:w-[80%]">
          <PdfLayout
            btnText="Back"
            primaryData={{
              primary_first_name: reception_data.primary_first_name,
              primary_phone: reception_data.primary_phone,
            }}
            secondaryData={{
              secondary_first_name: reception_data.secondary_first_name,
              secondary_phone: reception_data.secondary_phone,
            }}
            pdfType={pdfType}
            setPdfType={setPdfType}
          >
            <>
              <div className="text-center text-purple font-normal mt-10">
                <p className="capitalize underline text-2xl sm:text-2xl md:text-w_10xl font-[Playball] ">
                  Reception timeline
                </p>
              </div>
              <div className="w-[120px] mx-auto my-10 h-[50px] relative">
                <Image src="/images/pdf-image.png" alt="pdf-image" layout="fill" />
              </div>
              <div>
                <div className="w-full">
                  <div>
                    <div>
                      <div className="flex sm:ml-16 gap-5 mb-5 justify-center">
                        <div className="w-[50px] h-[50px]  relative">
                          <Image src="/images/cake.png" alt="cake" layout="fill" />
                        </div>
                        <div className="flex items-center">
                          <p className="text-2xl sm:text-4xl font-normal capitalize underline text-purple font-[Playball] ">
                            Reception
                          </p>
                        </div>
                      </div>
                      <Timeline position="right">
                        {reception_data.reception_items.map((item, ind) => (
                          <Fragment key={ind}>
                            <TimelineItem>
                              <TimelineOppositeContent sx={{ color: '#512F6F', fontWeight: item.heading ? 600 : 400 }}>
                                {item.heading ? item.heading : item.start_time}
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
                                    ...(ind === reception_data.reception_items.length - 1 && {
                                      '&.MuiTimelineConnector-root': {
                                        backgroundColor: '#bdbdbd !important',
                                        height: '1.2rem !important',
                                        display: 'block',
                                        flexGrow: 0,
                                      },
                                    }),
                                  }}
                                />
                              </TimelineSeparator>
                              {item.address_1 ? (
                                <TimelineContent
                                  sx={{ fontWeight: 600, color: '#512F6F', fontSize: '16px', width: '100%', mt: -1 }}
                                >
                                  {item.address_1}
                                  <div className="flex text-purple text-xs underline">
                                    <div className="w-[15px] h-[12px] relative top-1">
                                      <Image src={getLocationMarkLogo()} width={10} height={10} alt="logo" />
                                    </div>
                                    <div className="flex-1 max-w-[200px]">
                                      <a target="blank" href={generateLocationLink(item.link)}>
                                        {item.address_2}
                                      </a>
                                    </div>
                                  </div>
                                </TimelineContent>
                              ) : !item.travel?.length ? (
                                <TimelineContent sx={{ fontWeight: 400, color: '#512F6F' }}>
                                  {item.event_name}
                                </TimelineContent>
                              ) : (
                                <TimelineContent>
                                  {item.event_name}{' '}
                                  {item.start_time_epochs &&
                                    item.end_time_epochs &&
                                    `(${calculateTimeLeft(item.start_time_epochs, item.end_time_epochs)})`}
                                  <br />
                                  {item.travel && <span className="text-sm text-glossy_grape"> {item.travel}</span>}
                                </TimelineContent>
                              )}
                            </TimelineItem>
                          </Fragment>
                        ))}
                      </Timeline>
                    </div>
                    {/* <div className="md:mt-[4.3rem]">
                      <Timeline position="right">
                        <TimelineItem>
                          <TimelineOppositeContent sx={{ width: '20%', color: '#512F6F' }}>
                            8:30 PM
                          </TimelineOppositeContent>
                          <div className="divide-x "></div>
                          <TimelineSeparator>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: '7px',
                                width: '7px',
                                borderRadius: '100%',
                                backgroundColor: '#512F6F',
                                marginTop: '10px',
                              }}
                            />
                            <TimelineConnector sx={{ backgroundColor: '#DEE3F4' }} />
                          </TimelineSeparator>
                          <TimelineContent sx={{ color: '#333333' }}>Parent’s of Bride Toast</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineOppositeContent
                            sx={{
                              color: '#512F6F',
                            }}
                          >
                            8:35 PM
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: '7px',
                                width: '7px',
                                borderRadius: '100%',
                                backgroundColor: '#512F6F',
                                position: 'absolute',
                                top: '13px',
                              }}
                            />
                            <TimelineConnector sx={{ backgroundColor: '#DEE3F4' }} />
                          </TimelineSeparator>
                          <TimelineContent sx={{ color: '#333333' }}>Maid of Honor Toast</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineOppositeContent
                            sx={{
                              color: '#512F6F',
                            }}
                          >
                            8:40 PM
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: '7px',
                                width: '7px',
                                borderRadius: '100%',
                                backgroundColor: '#512F6F',
                                position: 'absolute',
                                top: '13px',
                              }}
                            />
                            <TimelineConnector sx={{ backgroundColor: '#DEE3F4' }} />
                          </TimelineSeparator>
                          <TimelineContent sx={{ color: '#333333' }}>Best Man Toast</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineOppositeContent
                            sx={{
                              color: '#512F6F',
                            }}
                          >
                            8:45 PM
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: '7px',
                                width: '7px',
                                borderRadius: '100%',
                                backgroundColor: '#512F6F',
                                position: 'absolute',
                                top: '13px',
                              }}
                            />
                            <TimelineConnector sx={{ backgroundColor: '#DEE3F4' }} />
                          </TimelineSeparator>
                          <TimelineContent sx={{ color: '#333333' }}>Cake Cutting</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineOppositeContent
                            sx={{
                              color: '#512F6F',
                            }}
                          >
                            8:50 PM
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: '7px',
                                width: '7px',
                                borderRadius: '100%',
                                backgroundColor: '#512F6F',
                                position: 'absolute',
                                top: '13px',
                              }}
                            />
                            <TimelineConnector sx={{ backgroundColor: '#DEE3F4' }} />
                          </TimelineSeparator>
                          <TimelineContent sx={{ color: '#333333' }}>Dancing</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineOppositeContent
                            sx={{
                              color: '#512F6F',
                            }}
                          >
                            9:00 PM
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: '7px',
                                width: '7px',
                                borderRadius: '100%',
                                backgroundColor: '#512F6F',
                                position: 'absolute',
                                top: '13px',
                              }}
                            />
                            <TimelineConnector sx={{ backgroundColor: '#DEE3F4' }} />
                          </TimelineSeparator>
                          <TimelineContent sx={{ color: '#333333' }}>Guest Shuttle</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineOppositeContent
                            sx={{
                              color: '#512F6F',
                            }}
                          >
                            10:55 PM
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: '7px',
                                width: '7px',
                                borderRadius: '100%',
                                backgroundColor: '#512F6F',
                                position: 'absolute',
                                top: '13px',
                              }}
                            />
                            <TimelineConnector
                              sx={{
                                '&.MuiTimelineConnector-root': {
                                  backgroundColor: '#DEE3F4 !important',
                                  height: '1.3rem !important',
                                  display: 'block',
                                  flexGrow: 0,
                                },
                              }}
                            />
                          </TimelineSeparator>
                          <TimelineContent sx={{ color: '#333333' }}>Last Dance</TimelineContent>
                        </TimelineItem>
                      </Timeline>
                    </div>
                    <div className="lg:mt-[4.3rem]">
                      <Timeline position="right">
                        <TimelineItem>
                          <TimelineOppositeContent sx={{ width: '20%', color: '#512F6F', fontWeight: 600 }}>
                            11:00 PM
                          </TimelineOppositeContent>
                          <div className="divide-x "></div>
                          <TimelineSeparator>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: '7px',
                                width: '7px',
                                borderRadius: '100%',
                                backgroundColor: '#512F6F',
                                marginTop: '10px',
                              }}
                            />
                            <TimelineConnector sx={{ backgroundColor: '#DEE3F4' }} />
                          </TimelineSeparator>
                          <TimelineContent sx={{ fontWeight: 700, color: '#512F6F' }}>Reception Ends</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineOppositeContent
                            sx={{
                              color: '#512F6F',
                            }}
                          >
                            11:15 PM
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: '7px',
                                width: '7px',
                                borderRadius: '100%',
                                backgroundColor: '#512F6F',
                                position: 'absolute',
                                top: '13px',
                              }}
                            />
                            <TimelineConnector sx={{ backgroundColor: '#DEE3F4' }} />
                          </TimelineSeparator>
                          <TimelineContent sx={{ color: '#333333' }}>Sparkler Exit</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineOppositeContent
                            sx={{
                              color: '#512F6F',
                            }}
                          >
                            11:30 PM
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: '7px',
                                width: '7px',
                                borderRadius: '100%',
                                backgroundColor: '#512F6F',
                                position: 'absolute',
                                top: '13px',
                              }}
                            />
                            <TimelineConnector
                              sx={{
                                '&.MuiTimelineConnector-root': {
                                  backgroundColor: '#DEE3F4 !important',
                                  height: '1.3rem !important',
                                  display: 'block',
                                  flexGrow: 0,
                                },
                              }}
                            />
                          </TimelineSeparator>
                          <TimelineContent sx={{ color: '#333333' }}>Guest Shuttle</TimelineContent>
                        </TimelineItem>
                      </Timeline>
                    </div> */}
                  </div>
                </div>
              </div>
            </>
          </PdfLayout>
        </div>
      )}
    </div>
  );
}
