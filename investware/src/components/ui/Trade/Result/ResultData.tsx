import TextXs from '@/components/common/Text/TextXs';
import { generateCalculateTradeData } from '@/utils/helperFunctions';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { StyledResultDataContainer, StyledResultDataRowStack, StyledResultDataTextStack } from '../ResultStyled';

interface Props {
  calculateTradeResponseData: any;
  searchResultsData: any;
  resultSearchShow: boolean;
}

const ResultData = ({ calculateTradeResponseData, searchResultsData, resultSearchShow }: Props) => {
  const [resultData, setResultData] = useState({});

  useEffect(() => {
    if (searchResultsData) {
      localStorage.setItem('responseTrade', JSON.stringify(searchResultsData));

      const data = !resultSearchShow ? calculateTradeResponseData : searchResultsData;
      setResultData(data);
    }
  }, [calculateTradeResponseData, resultSearchShow, searchResultsData]);

  return (
    <StyledResultDataContainer direction={'row'}>
      {Object.entries(resultData || {})
        .filter(([_, value]) => value !== undefined)
        .map(([key, value], index) => (
          <Stack
            key={index}
            sx={{
              width: { md: '20%', xs: '50%' },
            }}
          >
            <StyledResultDataRowStack>
              <StyledResultDataTextStack>
                <TextXs
                  sx={{
                    fontSize: { lg: '0.875rem', xs: '0.75rem' },
                    fontWeight: 600,
                    lineHeight: '1.5rem',
                    letterSpacing: '0.01063rem',
                    color: 'var(--text-grey-100)',
                    padding: { md: '1rem 0rem', xs: '1rem 0rem' },
                    width: { sm: 'auto', xs: 'auto' },
                  }}
                  text={key}
                />
              </StyledResultDataTextStack>
            </StyledResultDataRowStack>
            <Stack
              sx={{
                width: '100%',
              }}
            >
              <StyledResultDataTextStack>
                <TextXs
                  sx={{
                    fontSize: { lg: '0.875rem', xs: '0.75rem' },
                    lineHeight: '143%',
                    letterSpacing: '0.01063rem',
                    color: 'var(--text-black)',
                    padding: { md: '1rem 0rem', xs: '1rem 0rem' },
                    width: { sm: 'auto', xs: 'auto' },
                  }}
                  text={String(value)}
                />
              </StyledResultDataTextStack>
            </Stack>
          </Stack>
        ))}
    </StyledResultDataContainer>
  );
};

export default ResultData;
