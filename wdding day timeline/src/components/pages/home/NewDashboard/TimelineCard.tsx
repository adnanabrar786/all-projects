import { Accordion, AccordionDetails, AccordionSummary, Stack } from '@mui/material';
import Image from 'next/image';
import { memo, useMemo, useState } from 'react';
import { TimelineType } from 'utils/enums';
import { TEvent } from 'utils/types/timeline';
import AddEventCard from './AddEventCard';
import TimeLineAccordion from './TimeLineAccordion';
import TimelineHeader from './TimelineHeader';

interface Props {
  showTimeLineModal: boolean;
  toggleResetTimelineModal: () => void;
  topAndLeft: string;
  rightAndBottom: string;
  img?: string;
  primaryName: string;
  fianceName: string;
  timelineData: TEvent[];
  zone: string;
  type: TimelineType;
  bothImages: boolean;
  fianceImage?: string;
  secondary?: boolean;
  isFirstLook: boolean;
}

const TimelineCard = ({
  showTimeLineModal,
  toggleResetTimelineModal,
  topAndLeft,
  rightAndBottom,
  img,
  primaryName,
  timelineData,
  zone,
  type,
  fianceName,
  bothImages,
  fianceImage,
  secondary,
  isFirstLook,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  const list = useMemo(
    () =>
      timelineData.map((data, index) => (
        <TimeLineAccordion data={data} zone={zone} key={data.id} index={index} name={primaryName} />
      )),
    [timelineData],
  );

  return (
    <Stack
      sx={{
        width: { lg: '340px', xs: '342px' },
        margin: 'auto',
      }}
    >
      <Stack
        sx={{
          borderTop: `1px solid ${topAndLeft}`,
          borderLeft: `1px solid ${topAndLeft}`,
          borderRight: `1px solid ${rightAndBottom}`,
          borderBottom: `1px solid ${rightAndBottom}`,
          borderRadius: '16px',
          paddingBottom: '12px',
          height: '100%',
          display: { lg: 'flex', xs: 'none' },
          backgroundColor: '#FFFFFF',
        }}
      >
        <TimelineHeader
          primaryName={`${primaryName}'s Timeline`}
          img={img}
          bothImages={bothImages}
          fianceName={fianceName}
          fianceImage={fianceImage}
          secondary={secondary}
        />

        <AddEventCard
          showTimeLineModal={showTimeLineModal}
          setShowTimeLineModal={toggleResetTimelineModal}
          type={type}
          isFirstLook={isFirstLook}
        />

        <Stack>{list}</Stack>
      </Stack>

      <Stack
        sx={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            border: '1px solid #B0B0B0',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            height: '100%',
            display: { lg: 'none', xs: 'flex' },
            alignItems: 'center',
          }}
        >
          <Accordion
            elevation={0}
            expanded={expanded}
            onChange={handleAccordionToggle}
            sx={{
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
              '&.MuiAccordion-root': {
                borderRadius: '16px',
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
              }}
            >
              <Stack
                direction={'row'}
                sx={{
                  padding: '0px 16px 0px 0px',
                  gap: '4px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                }}
              >
                <TimelineHeader
                  primaryName={`${primaryName}'s Timeline`}
                  img={img}
                  fianceImage={fianceImage}
                  fianceName={fianceName}
                  bothImages={bothImages}
                  secondary={secondary}
                  sx={{ borderBottom: 'none', padding: '0px' }}
                />

                {expanded ? (
                  <Image src="/images/dashboard/upArrow.svg" alt="" width={11} height={5} />
                ) : (
                  <Image src="/images/dashboard/downArrow.svg" alt="" width={11} height={5} />
                )}
              </Stack>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: '12px 0px',
              }}
            >
              <AddEventCard
                showTimeLineModal={showTimeLineModal}
                setShowTimeLineModal={toggleResetTimelineModal}
                type={type}
                isFirstLook={isFirstLook}
              />

              <Stack
                sx={{
                  justifyContent: 'space-between',
                  width: '100%',
                  minHeight: '53px',
                  alignItems: 'center',
                }}
              >
                <Stack
                  sx={{
                    width: '100%',
                  }}
                >
                  {list}
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(TimelineCard);
