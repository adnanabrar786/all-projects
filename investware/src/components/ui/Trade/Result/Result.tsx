import OutLineButton from '@/components/common/Button/OutLineButton';
import TextMd from '@/components/common/Text/TextMd';
import { StyledResultContainer, StyledResultSubContainer } from '@/components/ui/Trade/ResultStyled';
import { BUTTON_TEXT, COMMON_MESSAGES } from '@/constants/locales';
import { useState } from 'react';
import ResultData from './ResultData';
import SaveResults from './SaveResults';

interface Props {
  disabledButton?: boolean;
  formik: any;
  calculateTradeResponseData: any;
  setCalculateTradeResponseData: (calculateTradeResponseData: any) => void;
  searchResultsData: any;
  setSearchTradeResponseData: (value: any) => void;
  resultSearchShow: boolean;
  securityId: string;
  setSelectedAddOnHeading: (value: string) => void;
  searchSecurityTypeId?: string | undefined;
  calculateTradeRequest: any;
  setSearchSelectedData: (searchSelectedData: any) => void;
  setResultSearchShow: (value: boolean) => void;
  setShouldReinitialize: (value: boolean) => void;
  setShowSearchResult: (value: boolean) => void;
  setSearchTradeId: (value: string) => void;
  setSearchValue: (value: string) => void;
}

const Result = ({
  disabledButton,
  formik,
  calculateTradeResponseData,
  setCalculateTradeResponseData,
  searchResultsData,
  setSearchTradeResponseData,
  resultSearchShow,
  securityId,
  setSelectedAddOnHeading,
  searchSecurityTypeId,
  calculateTradeRequest,
  setSearchSelectedData,
  setResultSearchShow,
  setShouldReinitialize,
  setShowSearchResult,
  setSearchTradeId,
  setSearchValue,
}: Props) => {
  const [showSaveResult, setShowSaveResult] = useState(false);

  return (
    <StyledResultContainer>
      <StyledResultSubContainer direction={'row'}>
        <TextMd
          sx={{
            color: 'var(--text-black)',
            letterSpacing: '0.00938rem',
            lineHeight: '160%',
          }}
          text={COMMON_MESSAGES.RESULT}
        />
        <OutLineButton
          disabled={disabledButton}
          onClick={() => {
            setShowSaveResult(true);
          }}
          text={BUTTON_TEXT.SAVED_RESULTS}
          sx={{
            fontSize: '0.8125rem',
            fontWeight: 500,
            lineHeight: '1.375rem',
            letterSpacing: '0.02875rem',
            padding: '0.25rem 1rem',
            height: 'auto',
            border: '1px solid var(--sky-blue-200)',
          }}
        />
      </StyledResultSubContainer>
      <ResultData
        resultSearchShow={resultSearchShow}
        calculateTradeResponseData={calculateTradeResponseData}
        searchResultsData={searchResultsData}
      />
      <SaveResults
        setSearchValue={setSearchValue}
        setSearchTradeId={setSearchTradeId}
        setShowSearchResult={setShowSearchResult}
        setShouldReinitialize={setShouldReinitialize}
        setResultSearchShow={setResultSearchShow}
        setSearchSelectedData={setSearchSelectedData}
        calculateTradeRequest={calculateTradeRequest}
        searchSecurityTypeId={searchSecurityTypeId}
        setSelectedAddOnHeading={setSelectedAddOnHeading}
        securityId={securityId}
        setSearchTradeResponseData={setSearchTradeResponseData}
        formik={formik}
        showSaveResult={showSaveResult}
        setShowSaveResult={setShowSaveResult}
        setCalculateTradeResponseData={setCalculateTradeResponseData}
      />
    </StyledResultContainer>
  );
};

export default Result;
