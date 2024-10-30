import { AccordionDetails, Box, Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import Image from 'next/image';
import { memo, useState } from 'react';
import { getFirstLetter } from 'utils/strings';
import CustomText from '../home/NewDashboard/CustomText';

interface Props {
  title: string;
  name: string;
  phone_no: string;
  email: string;
  picture: string | null;
  address: string | null;
  index: number;
  deleteBox: boolean;
  itemBackgroundColor?: string;
  form: (toggleAccordion: () => void) => JSX.Element | JSX.Element[];
}

const GuestVendorCardAccordion = ({
  title,
  name,
  email,
  form,
  index,
  address,
  picture,
  phone_no,
  deleteBox,
  itemBackgroundColor = '#FABB18',
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = () => setExpanded(!expanded);

  const isOdd = index % 2 !== 0;

  return (
    <Stack
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
                alignItems: 'center',
              }}
            >
              <Stack
                sx={{
                  backgroundColor: itemBackgroundColor,
                  width: '2.4375rem',
                  height: '2.4375rem',
                  borderRadius: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  img: {
                    p: 0.25,
                    borderRadius: '50%',
                    backgroundColor: itemBackgroundColor,
                  },
                }}
              >
                {picture ? (
                  <Stack>
                    <Image
                      src={picture}
                      fill
                      alt="Profile Picture"
                      quality={100}
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </Stack>
                ) : (
                  <CustomText
                    text={getFirstLetter(name).toUpperCase()}
                    sx={{
                      color: '#F2F0F5',
                      fontSize: '16px',
                      fontWeight: '700',
                      lineHeight: '19.36px',
                    }}
                  />
                )}
              </Stack>
              <Stack>
                <CustomText
                  text={name}
                  sx={{
                    lineHeight: '120%',
                    color: expanded ? 'var(--Text, rgba(0, 0, 0, 0.80))' : '#512F6F',
                    fontWeight: expanded ? '600' : '400',
                    fontSize: '0.75rem',
                    fontStyle: 'normal',
                  }}
                />
                {!expanded && (
                  <CustomText
                    text={title}
                    sx={{
                      lineHeight: '150%',
                      color: 'rgba(0, 0, 0, 0.40)',
                      fontSize: '0.75rem',
                      fontStyle: 'normal',
                    }}
                  />
                )}
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
          <Stack>
            <Stack
              direction={{ lg: 'row', xs: 'column' }}
              sx={{
                gap: '13px',
                borderBottom: '1px solid #B0B0B0',
                padding: '10px 16px 12px 16px',
              }}
            >
              <Stack
                sx={{
                  width: { lg: '50%', xs: '100%' },
                  gap: '0.75rem',
                }}
              >
                {title && (
                  <Stack
                    direction={'row'}
                    sx={{
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Image src="/images/dashboard/personIcon.svg" alt="" width={16} height={16} />
                    <CustomText
                      text={title}
                      sx={{
                        fontSize: '12px',
                        color: '#000000',
                        lineHeight: '18px',
                      }}
                    />
                  </Stack>
                )}

                {email && (
                  <Stack
                    direction={'row'}
                    sx={{
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Image src="/images/dashboard/email.svg" alt="" width={16} height={16} />
                    <CustomText
                      text={email}
                      sx={{
                        fontSize: '12px',
                        color: '#000000',
                        lineHeight: '18px',
                      }}
                    />
                  </Stack>
                )}
              </Stack>

              <Stack
                sx={{
                  width: { lg: '50%', xs: '100%' },
                  gap: '0.75rem',
                }}
              >
                {phone_no && (
                  <Stack
                    direction={'row'}
                    sx={{
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Image src="/images/dashboard/phone.svg" alt="" width={16} height={16} />
                    <CustomText
                      text={formatIncompletePhoneNumber(phone_no)}
                      sx={{
                        fontSize: '12px',
                        color: '#000000',
                        lineHeight: '18px',
                      }}
                    />
                  </Stack>
                )}

                {address && (
                  <Stack
                    direction={'row'}
                    sx={{
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Image src="/images/dashboard/location.svg" alt="" width={16} height={16} />
                    <CustomText
                      text={address}
                      sx={{
                        fontSize: '12px',
                        color: '#000000',
                        lineHeight: '18px',
                      }}
                    />
                  </Stack>
                )}
              </Stack>
            </Stack>

            <Stack
              sx={{
                px: { lg: 1, xs: 0.5 },
                py: { lg: 1, xs: 0.5 },
                pb: { lg: 3, xs: 3 },
              }}
            >
              {expanded && form(handleAccordionToggle)}
            </Stack>
          </Stack>
        </AccordionDetails>
        {deleteBox && (
          <Box
            sx={{
              background: '#00000040',
              height: '100%',
              position: 'absolute',
              width: '100%',
              top: 0,
            }}
          />
        )}
      </Accordion>
    </Stack>
  );
};

export default memo(GuestVendorCardAccordion);
