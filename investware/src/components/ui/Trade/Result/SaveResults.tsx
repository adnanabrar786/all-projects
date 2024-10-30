import TextButton from '@/components/common/Button/TextButton';
import CustomInput from '@/components/common/Input/CustomInput';
import CustomModal from '@/components/common/Modal/CustomModal';
import TextMd from '@/components/common/Text/TextMd';
import { emptyInitialValues } from '@/constants/constant';
import { LOCAL_STORAGE_KEYS } from '@/constants/keys';
import { COMMON_MESSAGES } from '@/constants/locales';
import { TOAST_MESSAGES } from '@/constants/locales/toast_message';
import { toastError, toastSuccess } from '@/constants/toaster';
import { ADDON_TYPES } from '@/interfaces/addons';
import { Calculate_Trade_Node, SaveTrade } from '@/services/trade.services';
import { Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  formik: any;
  showSaveResult: boolean;
  setShowSaveResult: (showSaveResult: boolean) => void;
  setCalculateTradeResponseData: (value: any) => void;
  setSearchTradeResponseData: (value: any) => void;
  securityId: string;
  searchSecurityTypeId?: string | undefined;
  setSelectedAddOnHeading: (value: string) => void;
  calculateTradeRequest: any;
  setSearchSelectedData: (value: any) => void;
  setResultSearchShow: (value: boolean) => void;
  setShouldReinitialize: (value: boolean) => void;
  setShowSearchResult: (value: boolean) => void;
  setSearchTradeId: (value: string) => void;
  setSearchValue: (value: string) => void;
}

const { CALLS, DISCOUNT_CURVE, FIXING_CURVE, SINKS } = ADDON_TYPES;
const { SPOT_CURVE, PAR_CURVE } = LOCAL_STORAGE_KEYS;

const SaveResults = ({
  showSaveResult,
  setShowSaveResult,
  formik,
  setCalculateTradeResponseData,
  setSearchTradeResponseData,
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
  const responseTrade =
    typeof localStorage !== 'undefined' && localStorage.getItem('responseTrade')
      ? JSON.parse(localStorage.getItem('responseTrade')!)
      : '';

  const [tradeName, setTradeName] = useState('');

  const handleSaveResult = () => {
    mutation.mutate();
  };

  const security_id = searchSecurityTypeId ? searchSecurityTypeId : securityId;

  const mutation = useMutation({
    mutationFn: () => {
      return Calculate_Trade_Node(calculateTradeRequest, security_id);
    },
    onSuccess: (data) => {
      const tradeId = data?.data?.data?.id;
      if (tradeId) {
        mutationSave.mutate(tradeId);
      }
    },
    onError: (error: { message: string }) => {
      toastError(error.message);
    },
  });

  const mutationSave = useMutation({
    mutationFn: (tradeId: string) => {
      const saveResultData: any = {
        name: tradeName,
        result: responseTrade && responseTrade,
      };

      return SaveTrade(saveResultData, tradeId);
    },

    onSuccess: () => {
      setSelectedAddOnHeading('None');
      setCalculateTradeResponseData({});
      setSearchTradeResponseData({});
      setResultSearchShow(false);

      setShowSearchResult(false);
      setSearchSelectedData({});

      setTradeName('');
      setSearchTradeId('');
      setSearchValue('');
      setShowSaveResult(false);

      setShouldReinitialize(false);

      formik.resetForm({ values: emptyInitialValues });

      localStorage.removeItem(CALLS);
      localStorage.removeItem(SINKS);
      localStorage.removeItem(FIXING_CURVE);
      localStorage.removeItem(DISCOUNT_CURVE);
      localStorage.removeItem(SPOT_CURVE);
      localStorage.removeItem(PAR_CURVE);
      localStorage.removeItem('responseTrade');

      toastSuccess(TOAST_MESSAGES.TRADE_SAVED);
    },
    onError: (error: { message: string }) => {
      toastError(error.message);
    },
  });
  return (
    <CustomModal
      sx={{
        borderRadius: '0.25rem',
        boxShadow:
          '0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 5px 5px -3px rgba(0, 0, 0, 0.20)',
        width: '100%',
      }}
      showModal={showSaveResult}
      setShowModal={setShowSaveResult}
    >
      <Stack
        sx={{
          width: { md: '37.5rem', xs: '100%' },
        }}
      >
        <Stack
          sx={{
            padding: { md: '1.25rem 2rem 0.5rem 2rem', xs: '2rem 1.12rem' },
          }}
        >
          <TextMd
            text="Save Results"
            sx={{
              lineHeight: '160%',
              letterSpacing: '0.00938rem',
              fontStyle: '500',
              fontSize: { sm: '1.25rem', xs: '1.1rem' },
            }}
          />

          <Stack
            sx={{
              marginTop: { sm: '1.5rem', xs: '2.5rem' },
            }}
          >
            <CustomInput
              sxTextField={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: 'rgba(0, 0, 0, 0.60)',
                  },
                },
              }}
              label={COMMON_MESSAGES.DESCRIPTION}
              value={tradeName}
              onChange={(e) => {
                setTradeName(e.target.value);
              }}
            />
          </Stack>
          <Stack
            sx={{
              justifyContent: { sm: 'flex-end', xs: 'space-between' },
              gap: { sm: '2rem', xs: '0.2rem' },
              marginTop: '2.62rem',
            }}
            direction={'row'}
          >
            <TextButton
              loading={mutation.isPending || mutationSave.isPending}
              onClick={handleSaveResult}
              sx={{
                color: 'var(--sky-blue)',
                width: 'auto',
                fontSize: '0.875rem',
                lineHeight: '1.5rem',
                letterSpacing: '0.025rem',
              }}
              text="SAVE"
            />
            <TextButton
              disabled={mutation.isPending || mutationSave.isPending}
              onClick={() => {
                setShowSaveResult(false);
              }}
              sx={{
                color: 'var(--sky-blue)',
                width: 'auto',
                fontSize: '0.875rem',
                lineHeight: '1.5rem',
                letterSpacing: '0.025rem',
              }}
              text="Cancel"
            />
          </Stack>
        </Stack>
      </Stack>
    </CustomModal>
  );
};

export default SaveResults;
