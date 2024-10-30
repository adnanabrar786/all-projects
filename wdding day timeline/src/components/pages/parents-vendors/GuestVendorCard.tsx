import { Accordion, AccordionDetails, AccordionSummary, Stack, SxProps } from '@mui/material';
import { memo, useState } from 'react';
import GuestVendorCardHeader from './GuestVendorCardHeader';

interface Props {
  sx?: SxProps;
  addButtonText: string;
  img: string | null;
  secondary?: boolean;
  couple_name: string;
  sxContainer?: SxProps;
  toggleForm: () => void;
  showNewform: boolean;
  itemBackgroundColor?: string;
  children: JSX.Element | JSX.Element[];
  newForm: (expanded: boolean) => JSX.Element | JSX.Element[];
}

const GuestVendorCard = ({
  sx,
  img,
  newForm,
  children,
  toggleForm,
  showNewform,
  sxContainer,
  couple_name,
  addButtonText,
  itemBackgroundColor = 'bg-[#FABB18]',
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = () => setExpanded(!expanded);

  return (
    <Stack
      sx={{
        width: { lg: '100%' },
        ...sxContainer,
      }}
    >
      {/* For Desktop */}
      <Stack
        sx={{
          borderRadius: '16px',
          width: '100%',
          margin: '0 auto',
          paddingBottom: '12px',
          height: '100%',
          display: { lg: 'flex', xs: 'none' },
          border: `1px solid #B0B0B0`,
          backgroundColor: '#ffff',
          ...sx,
        }}
      >
        <GuestVendorCardHeader
          img={img}
          name={couple_name}
          toggleForm={toggleForm}
          showNewform={showNewform}
          addButtonText={addButtonText}
          itemBackgroundColor={itemBackgroundColor}
          sx={{
            backgroundColor: 'white',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
          }}
        />
        {newForm(expanded)}
        <Stack>{children}</Stack>
      </Stack>

      {/* For Mobile */}
      <Stack
        sx={{
          width: '21rem',
          margin: '0 auto',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            border: '1px solid #B0B0B0',
            borderRadius: '16px',
            backgroundColor: 'white',
            height: '100%',
            display: { lg: 'none', xs: 'flex' },
            alignItems: 'center',
            padding: '0px',
            width: '21rem',
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
              '.MuiAccordionDetails-root': {
                padding: '0px',
              },
              width: '100%',
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

                  '&.Mui-expanded': {
                    margin: '0px',
                  },
                },
              }}
            >
              <Stack
                sx={{
                  width: '100%',
                }}
              >
                <Stack
                  direction={'row'}
                  sx={{
                    padding: '0px 0px 0px 0px',
                    gap: '4px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    display: 'initial',
                  }}
                >
                  <GuestVendorCardHeader
                    img={img}
                    name={couple_name}
                    expanded={expanded}
                    toggleForm={toggleForm}
                    showNewform={showNewform}
                    addButtonText={addButtonText}
                    itemBackgroundColor={itemBackgroundColor}
                    sx={{ borderBottom: 'none', padding: '0px' }}
                  />
                </Stack>
                <Stack onClick={(e) => e.stopPropagation()}>{newForm(expanded)}</Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                sx={{
                  justifyContent: 'space-between',
                  width: '100%',
                  minHeight: '53px',
                  alignItems: 'center',
                  margin: '0px auto 10px auto',
                }}
              >
                <Stack sx={{ width: '100%' }}>{children}</Stack>
              </Stack>
              {/*       <Stack
                sx={{
                  width: '60%',
                  margin: '8px auto 20px auto',
                }}
              >
               <Pagination
                  siblingCount={0}
                  boundaryCount={0}
                  sx={{
                    alignSelf: 'center',
                    padding: '0.5rem',
                    button: {
                      ':not(.Mui-selected)': {
                        color: '#999999',
                      },
                    },
                    width: '100%',
                    ul: {
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    },
                    '.Mui-selected': {
                      backgroundColor: 'var( --white) !important',
                      color: '#00CAA5 !important',
                      ':hover': {
                        backgroundColor: 'var( --white) !important',
                        color: '#00CAA5  !important',
                      },
                      fontSize: '0.875rem',
                      fontStyle: 'normal',
                      lineHeight: '1.25rem',
                      fontWeight: '500',
                      border: '1px solid #00CAA5',
                    },
                    '.MuiSvgIcon-root': {
                      color: '#999999',
                    },
                    '.MuiButtonBase-root': {
                      '&.Mui-disabled': {
                        color: '',
                        backgroundColor: '#999',
                        '.MuiSvgIcon-root': {
                          color: 'white',
                        },
                      },
                    },
                  }}
                  count={20}
                  variant="outlined"
                /> 
              </Stack>
              */}
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(GuestVendorCard);
