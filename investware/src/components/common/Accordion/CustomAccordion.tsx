import SwitchButton from '@/components/common/SwitchButton/SwitchButton';
import TextMd from '@/components/common/Text/TextMd';
import TextXs from '@/components/common/Text/TextXs';
import { formatDate } from '@/utils/date';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, SxProps } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ReactNode, useState } from 'react';
import Label from './Header/Label';
import LabelName from './Header/LabelName';
interface Props {
  expandIcon?: ReactNode;
  children?: ReactNode;
  headerTextHeading?: string;
  headerTextSubHeading?: string | string[];
  manualEntryText?: string;
  manualEntryToggle?: boolean;
  setManualEntryToggle?: (toggle: boolean) => void;
  description?: string;
  settle_Date?: string;
  price?: string;
  sxMainHeading?: SxProps;
  sxSummary?: SxProps;
  onAccordionChange?: (isExpanded: boolean) => void;
}

const CustomAccordion = ({
  expandIcon,
  children,
  headerTextHeading,
  headerTextSubHeading,
  manualEntryText,
  manualEntryToggle,
  setManualEntryToggle,
  description,
  settle_Date,
  price,
  sxMainHeading,
  sxSummary,
  onAccordionChange,
}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleAccordionChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
    if (onAccordionChange) {
      onAccordionChange(isExpanded);
    }
  };

  return (
    <Stack
      sx={{
        border: '1px solid #E0E0E0',
        borderRadius: '0.25rem',
      }}
    >
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary
          expandIcon={expandIcon ?? <ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            ...sxSummary,
          }}
        >
          <Stack
            direction={'row'}
            sx={{
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Stack
              //FOR SMALL SCREEN COL AND FOR LARGE ROW
              direction={{ md: 'row', xs: 'column' }}
              sx={{
                alignItems: 'center',
                gap: { sm: '1rem', xs: '0.3rem' },
                width: { md: 'auto', xs: '100%' },
              }}
            >
              <Stack
                direction={'row'}
                sx={{ width: { md: 'auto', xs: '100%' }, alignItems: 'center', ...sxMainHeading }}
              >
                {headerTextHeading && (
                  <TextMd
                    text={headerTextHeading}
                    sx={{
                      lineHeight: '160%',
                      letterSpacing: '0.00938rem',
                      fontStyle: '500',
                      fontSize: '1.25rem',
                      borderRight:
                        !expanded && (description || settle_Date || price || headerTextSubHeading)
                          ? '1px solid var(--grey-200)'
                          : 'none',
                      paddingRight: { sm: '1rem', xs: '0.5rem' },
                    }}
                  />
                )}
                {!expanded && headerTextSubHeading && (
                  <TextXs
                    text={headerTextSubHeading}
                    sx={{
                      lineHeight: '150%',
                      letterSpacing: '0.00938rem',
                      fontSize: '1rem',
                      fontStyle: '400',
                      paddingLeft: { sm: '1rem', xs: '0.5rem' },
                      color: 'rgba(0, 0, 0, 0.87)',
                      textTransform: 'capitalize',
                    }}
                  />
                )}

                {/* FOR SMALL SCREEN */}
                <Stack
                  sx={{
                    display: { md: 'none', xs: 'flex' },
                  }}
                >
                  {manualEntryText && (
                    <Stack
                      sx={{
                        justifyContent: 'center',
                      }}
                    >
                      <Stack
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                        direction={'row'}
                        sx={{
                          border: '1px solid #E0E0E0',
                          borderRadius: '0.25rem',
                          padding: { sm: '0rem 0.4rem 0 0.75rem', xs: '0.2rem 0.2rem 0.2rem 0.4rem' },
                          gap: '0.44rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: { sm: '1rem', xs: '0.3rem' },
                          height: '1.5rem',
                        }}
                      >
                        <TextXs
                          sx={{
                            color: 'var(--text-black)',
                            letterSpacing: '0.0075rem',
                            lineHeight: '166%',
                          }}
                          text={manualEntryText}
                        />
                        <SwitchButton
                          switchHandler={() => {
                            if (setManualEntryToggle) {
                              setManualEntryToggle(!manualEntryToggle);
                            }
                          }}
                          value={manualEntryToggle}
                        />
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </Stack>

              <Stack
                sx={{
                  width: '100%',
                  display: description || settle_Date || price ? 'flex' : 'none',
                }}
              >
                {!expanded && (
                  <Stack
                    direction={'row'}
                    sx={{
                      gap: '2rem',
                      marginTop: { sm: '0rem', xs: '0.5rem' },
                    }}
                  >
                    {description && (
                      <Stack>
                        <Stack>
                          <Label text="Description" />
                          <LabelName text={description} />
                        </Stack>
                      </Stack>
                    )}
                    {settle_Date && (
                      <Stack>
                        <Stack>
                          <Label text="Settle Date" />
                          <LabelName text={formatDate(settle_Date)} />
                        </Stack>
                      </Stack>
                    )}
                    {price && (
                      <Stack>
                        <Label text="Price" />
                        <LabelName text={price || ''} />
                      </Stack>
                    )}
                  </Stack>
                )}
              </Stack>
            </Stack>

            {/* FOR LARGE SCREEN */}
            <Stack
              sx={{
                display: { md: 'flex', xs: 'none' },
              }}
            >
              {manualEntryText && (
                <Stack
                  sx={{
                    justifyContent: 'center',
                  }}
                >
                  <Stack
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    direction={'row'}
                    sx={{
                      border: '1px solid #E0E0E0',
                      borderRadius: '0.25rem',
                      padding: { sm: '0rem 0.4rem 0 0.75rem', xs: '0.2rem 0.2rem 0.2rem 0.4rem' },
                      gap: '0.44rem',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: { sm: '1rem', xs: '0.3rem' },
                      height: '2.25rem',
                    }}
                  >
                    <TextXs
                      sx={{
                        color: 'var(--text-black)',
                        letterSpacing: '0.0075rem',
                        lineHeight: '166%',
                      }}
                      text={manualEntryText}
                    />
                    <SwitchButton
                      switchHandler={() => {
                        if (setManualEntryToggle && expanded) {
                          setManualEntryToggle(!manualEntryToggle);
                        }
                      }}
                      value={manualEntryToggle}
                    />
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default CustomAccordion;
