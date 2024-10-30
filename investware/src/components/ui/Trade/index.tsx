import CustomButton from '@/components/common/Button/CustomButton';
import OutLineButton from '@/components/common/Button/OutLineButton';
import TextXs from '@/components/common/Text/TextXs';
import { TRADE_SCHEMA } from '@/config/validation';
import { emptyInitialValues, Exclude_Holidays_List } from '@/constants/constant';
import { SearchIcon } from '@/constants/images.routes';
import { LOCAL_STORAGE_KEYS } from '@/constants/keys';
import { BUTTON_TEXT } from '@/constants/locales';
import { TOAST_MESSAGES } from '@/constants/locales/toast_message';
import { prePayModelData, RateResetFrequencyData, SECURITY_TYPE_VALUES, stateData } from '@/constants/securities';
import { toastError, toastSuccess } from '@/constants/toaster';
import useSearchTrade from '@/hooks/useSearchTrade';
import { ADDON_TYPES } from '@/interfaces/addons';
import { IRequest } from '@/interfaces/request';
import { ISecuritySelectedType, ISecurityType, ISecurityTypeBackendData } from '@/interfaces/securities';
import { ISinks } from '@/interfaces/sinks';
import { TradeFormValues } from '@/interfaces/trade';
import { CalculateTrade } from '@/services/trade.services';
import { generateCalculateTradeData } from '@/utils/helperFunctions';
import { Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AddOnDetails from './AddOnDetails';
import Result from './Result/Result';
import SearchResult from './SearchResult';
import TradeDetails from './TradeDetails';
import {
  StyledButtonTradeContainer,
  StyledSaveButtonContainer,
  StyledSaveButtonSubContainer,
  TradeLayout,
} from './TradeStyled';

const { CALLS, DISCOUNT_CURVE, FIXING_CURVE, SINKS } = ADDON_TYPES;
const { SPOT_CURVE, PAR_CURVE } = LOCAL_STORAGE_KEYS;

interface Props {
  getSecurityTypeData: ISecurityTypeBackendData[];
}

const Trade = ({ getSecurityTypeData }: Props) => {
  const [securityTypeValueLabel, setSecurityTypeValueLabel] = useState<ISecurityType>({
    label: '',
    value: '',
  });
  const [selectedSecurityTypes, setSelectedSecurityTypes] = useState<ISecuritySelectedType>({
    id: '',
    value: '',
    label: '',
  });

  const [selectedAddOnHeading, setSelectedAddOnHeading] = useState('None');
  const [calculateTradeResponseData, setCalculateTradeResponseData] = useState({});
  const [searchTradeResponseData, setSearchTradeResponseData] = useState({});
  const [securityId, setSecurityId] = useState('');

  const [shouldReinitialize, setShouldReinitialize] = useState(true);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchTradeId, setSearchTradeId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const { searchList } = useSearchTrade(searchValue);
  const [resultSearchShow, setResultSearchShow] = useState(false);

  const [searchSelectedData, setSearchSelectedData] = useState<any>(null);

  useEffect(() => {
    if (searchList && searchTradeId) {
      const selectedData = searchList?.find((val: any) => val.id === searchTradeId);
      setSearchSelectedData(selectedData);
    }
  }, [searchList, searchTradeId, resultSearchShow]);

  switch (searchSelectedData?.request?.add_ons_value.type) {
    case SINKS:
      localStorage.setItem(SINKS, JSON.stringify(searchSelectedData?.request?.add_ons_value?.value));
      break;

    case CALLS:
      localStorage.setItem(CALLS, JSON.stringify(searchSelectedData?.request?.add_ons_value?.value));
      break;

    case FIXING_CURVE:
      localStorage.setItem(FIXING_CURVE, JSON.stringify(searchSelectedData?.request?.add_ons_value?.value));
      break;

    case DISCOUNT_CURVE:
      localStorage.setItem(DISCOUNT_CURVE, JSON.stringify(searchSelectedData?.request?.add_ons_value?.value));
      break;

    default:
      break;
  }

  const [parCurve, setParCurve] = useState(searchSelectedData?.request?.FIXINGPARYN || false);

  const [spotCurve, setSpotCurve] = useState(searchSelectedData?.request?.DISCPARYN || false);

  useEffect(() => {
    if (searchSelectedData?.request?.FIXINGPAR || searchSelectedData?.request?.DISCPARYN) {
      setParCurve(searchSelectedData?.request?.FIXINGPARYN || false);
      setSpotCurve(searchSelectedData?.request?.DISCPARYN || false);
    }
  }, [
    searchSelectedData?.request?.DISCPARYN,
    searchSelectedData?.request?.FIXINGPAR,
    searchSelectedData?.request?.FIXINGPARYN,
  ]);

  const callsData =
    typeof localStorage !== 'undefined' && localStorage.getItem(CALLS) ? JSON.parse(localStorage.getItem(CALLS)!) : [];

  const sinksData =
    typeof localStorage !== 'undefined' && localStorage.getItem(SINKS) ? JSON.parse(localStorage.getItem(SINKS)!) : [];

  const fixingCurveData =
    typeof localStorage !== 'undefined' && localStorage.getItem(FIXING_CURVE)
      ? JSON.parse(localStorage.getItem(FIXING_CURVE)!)
      : [];
  const discountCurveData =
    typeof localStorage !== 'undefined' && localStorage.getItem(DISCOUNT_CURVE)
      ? JSON.parse(localStorage.getItem(DISCOUNT_CURVE)!)
      : [];

  const filteredCallsData = callsData.reduce(
    (acc: any, item: any) => {
      acc.DTCALL.push(dayjs(item.CallsDate).format('MM/DD/YYYY'));
      acc.CALLPRC.push(Number(item.CallsPrices));
      return acc;
    },
    { DTCALL: [] as string[], CALLPRC: [] as number[] },
  );

  const filteredSinksData = sinksData
    .map((item: { SinksDate: Date; SinksAmount: number; SinksPrice: number }) => ({
      DTSINK: item.SinksDate,
      SINKAMT: Number(item.SinksAmount),
      SINKPRC: Number(item.SinksPrice),
    }))
    .filter((val: ISinks) => val.DTSINK && val.SINKAMT && val.SINKPRC);

  const filteredDataValues = fixingCurveData.filter((item: any) => item.Maturity && item.Rate);

  const fixingMaturityValues = filteredDataValues.map((item: any) => Number(item.Maturity));
  const fixingRateValues = filteredDataValues.map((item: any) => Number(item.Rate));

  const discountCurveDataValues = discountCurveData.filter((item: any) => item.Maturity && item.Rate);
  const discountMaturityValues = discountCurveDataValues.map((item: any) => Number(item.Maturity));
  const discountRateValues = discountCurveDataValues.map((item: any) => Number(item.Rate));

  const handleSaveButtonClick = () => {
    setShowSearchResult(true);
  };

  const handleCalculate = () => {
    const {
      rate_reset_frequency,
      using_fixing_curve,
      // TODO: for now security type Mortgage and Indexed is remove in security type
      // index_ratio_settle,
      // inflation_rate,
      // maturity_adjusted,
      // security_type,
      // last_date_factor,
      // factor,
      // pre_pay_modal,
      // pre_pay_speed,
      // weghted_avg_maturity,
      fed_tax_rate,
      state_tax_rate,
      state_of_issue,
      state_of_residence,
      dated,
    }: any = formik.values;

    // TODO: for future use
    // if (!formik.values.price && !formik.values.yield) {
    //   toastError('Please provide either Price or Yield');
    //   return;
    // }

    if (formik.values.after_tax_calcs) {
      if (!fed_tax_rate || !state_tax_rate || !state_of_issue.value || !state_of_residence.value) {
        toastError('Please fill all After Tax Values');
        return;
      }
    }

    if (securityTypeValueLabel.label === SECURITY_TYPE_VALUES.Floater) {
      if (!rate_reset_frequency.value || !using_fixing_curve) {
        toastError('Please fill all Floater Values');
        return;
      }
    }

    if (securityTypeValueLabel.label !== SECURITY_TYPE_VALUES.Discount) {
      if (!formik.values.coupons) {
        toastError('Please fill Coupons Values');
        return;
      }
    }

    // TODO: for future use
    // if (security_type === 'CD-30/360' || security_type === 'CD-ACT/360') {
    //   if (!dated) {
    //     toastError('Please fill Dated values');
    //     return;
    //   }
    // }

    // TODO: for now security type Mortgage is remove in security type

    // TODO: for now security type Floater is remove in security type
    // switch (security_type) {
    //   case 'FLOATER-Qrtly-Monthly-Act/Act':
    //   case 'FLOATER-Semi-Monthly-Act/Act':
    //   case 'FLOATER-Semi-Qrtly-Act/Act':
    //     if (!rate_reset_frequency.value || !using_fixing_curve) {
    //       toastError('Please fill all Floater Values');
    //       return;
    //     }
    //     break;
    //   default:
    //     break;
    // }

    // TODO: for now security type Indexed is remove in security type
    // if (security_type === 'INDEXILR-Semi-Act' || security_type === 'INDEXUSA-Semi-Act') {
    //   if (!index_ratio_settle || !inflation_rate || !maturity_adjusted) {
    //     toastError('Please fill all Indexed Values');
    //     return;
    //   }
    // }

    if (!mutation.isPending) {
      mutation.mutate();
    }
  };

  const selectedHoliday = Exclude_Holidays_List.find(
    (item: any) => item.value === searchSelectedData?.request?.INTHOLIDAYRULE,
  );

  const selectedStateOfIssue = stateData.find((item: any) => item.value === searchSelectedData?.request?.STATEOFISSUE);

  const selectedStateOfResidency = stateData.find(
    (item: any) => item.value === searchSelectedData?.request?.STATEOFRESIDENCE,
  );

  const selectedPrePayModel = prePayModelData.find(
    (item: any) => item.value === searchSelectedData?.results?.pre_pay_model,
  );

  const selectedRateResetFrequency = RateResetFrequencyData.find(
    (item: any) => item.value === searchSelectedData?.request?.RESETPERIODICITY,
  );

  useEffect(() => {
    let searchResultsData: any;
    if (searchSelectedData && searchSelectedData.results) {
      searchResultsData = searchSelectedData.results;

      delete searchResultsData.add_ons_value;
      setSearchTradeResponseData(searchResultsData);
    }
  }, [searchSelectedData]);

  const formik = useFormik<TradeFormValues>({
    initialValues:
      shouldReinitialize && searchSelectedData?.results
        ? {
            security_description: searchSelectedData?.request?.DESCR ? searchSelectedData?.request?.DESCR : '',
            security_type: searchSelectedData?.request?.securityType ? searchSelectedData?.request?.securityType : '',
            security_id: searchSelectedData?.request?.SECURITYID ? searchSelectedData?.request?.SECURITYID : '',

            issuer: searchSelectedData?.request?.ISSUER ? searchSelectedData?.request?.ISSUER : '',
            maturity_date: searchSelectedData?.request?.dtMaturity ? searchSelectedData?.request?.dtMaturity : null,

            settle_date: searchSelectedData?.request?.dtSettle ? searchSelectedData?.request?.dtSettle : null,
            price_yield: searchSelectedData?.request?.settlePrc
              ? searchSelectedData?.request?.settlePrc
              : searchSelectedData?.request?.SETTLEYLD
                ? searchSelectedData?.request?.SETTLEYLD
                : null,
            par: searchSelectedData?.request?.faceAmt ? searchSelectedData?.request?.faceAmt : null,
            dated: searchSelectedData?.request?.DTDATED ? searchSelectedData?.request?.DTDATED : null,
            first_coupon: searchSelectedData?.request?.DT1STPAY ? searchSelectedData?.request?.DT1STPAY : null,
            exclude_holidays: {
              label: selectedHoliday?.label ? selectedHoliday?.label : '',
              value: selectedHoliday?.value ? selectedHoliday?.value : '',
            },
            coupons: searchSelectedData?.request?.CpnRt ? searchSelectedData?.request?.CpnRt : '',
            after_tax_calcs: searchSelectedData?.request?.AFTERTAXCALCSYN
              ? searchSelectedData?.request?.AFTERTAXCALCSYN
              : false,

            fed_tax_rate: searchSelectedData?.request?.TAXRATEFEDINCOME
              ? searchSelectedData?.request?.TAXRATEFEDINCOME
              : null,
            state_tax_rate: searchSelectedData?.request?.TAXRATESTATEINCOME
              ? searchSelectedData?.request?.TAXRATESTATEINCOME
              : null,
            state_of_issue: {
              label: selectedStateOfIssue?.label ? selectedStateOfIssue?.label : '',
              value: selectedStateOfIssue?.value ? selectedStateOfIssue?.value : '',
            },
            state_of_residence: {
              label: selectedStateOfResidency?.label ? selectedStateOfResidency?.label : '',
              value: selectedStateOfResidency?.value ? selectedStateOfResidency?.value : '',
            },

            rate_reset_frequency: {
              label: selectedRateResetFrequency?.label ? selectedRateResetFrequency?.label : '',
              value: selectedRateResetFrequency?.value ? selectedRateResetFrequency?.value : '',
            },
            using_fixing_curve: searchSelectedData?.request?.USEFIXINGCURVEYN
              ? searchSelectedData?.request?.USEFIXINGCURVEYN
              : false,

            // TODO: for future use  Mortgage values
            // last_date_factor: searchSelectedData?.request?.last_factor_date
            //   ? searchSelectedData?.request?.last_factor_date
            //   : null,
            // weghted_avg_maturity: searchSelectedData?.request?.weighted_avg_maturity
            //   ? searchSelectedData?.request?.weighted_avg_maturity
            //   : null, //integer
            // factor: searchSelectedData?.request?.factor ? searchSelectedData?.request?.factor : null, //float
            // pre_pay_modal: {
            //   label: selectedPrePayModel?.label ? selectedPrePayModel?.label : '',
            //   value: selectedPrePayModel?.value ? selectedPrePayModel?.value : '',
            // },
            // pre_pay_speed: searchSelectedData?.request?.pre_pay_speed
            //   ? searchSelectedData?.request?.pre_pay_speed
            //   : null, //float

            // TODO: for future use  Indexed values
            // index_ratio_settle: searchSelectedData?.request?.index_ratio_at_settle
            //   ? searchSelectedData?.request?.index_ratio_at_settle
            //   : null, //float
            // inflation_rate: searchSelectedData?.request?.inflation_rate
            //   ? searchSelectedData?.request?.inflation_rate
            //   : null, //float
            // maturity_adjusted: searchSelectedData?.request?.maturity_adjusted
            //   ? searchSelectedData?.request?.maturity_adjusted
            //   : false,
          }
        : emptyInitialValues,
    validationSchema: TRADE_SCHEMA(),
    onSubmit: handleCalculate,
    enableReinitialize: true,
  });

  let calculateRequest: IRequest | any;

  calculateRequest = {
    //   // TODO: for now security type Mortgage is remove in security type
    //   //  // Mortgage values
    //   //  DTPASSFACTOR:  formik.values.security_type === 'MORT-Monthly-30/360' ? formik.values.last_date_factor : null,
    //   //  PASSWARM:  formik.values.security_type === 'MORT-Monthly-30/360'' ? formik.values.weghted_avg_maturity : null,
    //   //  PASSFACTOR:  formik.values.security_type === 'MORT-Monthly-30/360'' ? formik.values.factor : null,
    //   //  PASSMODEL:  formik.values.security_type === 'MORT-Monthly-30/360'' ? formik.values.pre_pay_modal.value : '',
    //   //  PREPAYSPEED:  formik.values.security_type === 'MORT-Monthly-30/360'' ? formik.values.pre_pay_speed : null,

    //   //  TODO: for now security type Indexed is remove in security type
    //   //  // Indexed values
    //   //  IDXRATIOATSETTLE:
    //   //  formik.values.security_type === 'INDEXILR-Semi-Act' || 'INDEXUSA-Semi-Act'
    //   //     ? formik.values.index_ratio_settle
    //   //     : null,
    //   //  INFLATIONRT:
    //   //formik.values.security_type === 'INDEXILR-Semi-Act' || 'INDEXUSA-Semi-Act' ? formik.values.inflation_rate : null,
    //   // maturity_adjusted:
    //   //  ADJUSTMATURITYYN:
    //   //   formik.values.security_type === 'INDEXILR-Semi-Act' || 'INDEXUSA-Semi-Act'
    //   //     ? formik.values.maturity_adjusted
    //   //     : false,
    //   // CpnRt: formik.values.security_type === SECURITY_TYPE_VALUES.Discount ? '' : formik.values.coupons,

    securityType: formik.values.security_type,
    faceAmt: formik.values.par ? formik.values.par : null,
    dtMaturity: formik.values.maturity_date ? dayjs(formik.values.maturity_date).format('MM/DD/YYYY') : null,
    dtSettle: formik.values.settle_date ? dayjs(formik.values.settle_date).format('MM/DD/YYYY') : null,
    calcRequest: [0, 2, 3, 6, 7, 9, 10, 11, 26, 27, 42, 43],
  };

  if (securityTypeValueLabel.label !== SECURITY_TYPE_VALUES.Discount && formik.values.coupons) {
    calculateRequest = {
      ...calculateRequest,
      CpnRt: formik.values.coupons,
    };
  }

  if (formik.values.security_description) {
    calculateRequest = {
      ...calculateRequest,
      DESCR: formik.values.security_description ? formik.values.security_description : '',
    };
  }

  if (formik.values.security_id) {
    calculateRequest = {
      ...calculateRequest,
      SECURITYID: formik.values.security_id,
    };
  }

  if (formik.values.issuer) {
    calculateRequest = {
      ...calculateRequest,
      ISSUER: formik.values.issuer,
    };
  }

  if (formik.values.dated) {
    calculateRequest = {
      ...calculateRequest,
      DTDATED: formik.values.dated ? dayjs(formik.values.dated).format('MM/DD/YYYY') : null,
    };
  }

  if (formik.values.first_coupon) {
    calculateRequest = {
      ...calculateRequest,
      DT1STPAY: formik.values.first_coupon ? dayjs(formik.values.first_coupon).format('MM/DD/YYYY') : null,
    };
  }

  if (formik.values.exclude_holidays.value) {
    calculateRequest = {
      ...calculateRequest,
      INTHOLIDAYRULE: formik.values.exclude_holidays.value ? formik.values.exclude_holidays.value : '',
    };
  }

  if (formik.values.price_yield && formik.values.price_yield > 50) {
    calculateRequest = {
      ...calculateRequest,
      settlePrc: formik.values.price_yield,
    };
  }

  if (formik.values.price_yield && formik.values.price_yield < 50) {
    calculateRequest = {
      ...calculateRequest,
      SETTLEYLD: formik.values.price_yield,
    };
  }

  // after tax value
  if (formik.values.after_tax_calcs) {
    calculateRequest = {
      ...calculateRequest,
      AFTERTAXCALCSYN: formik.values.after_tax_calcs ? formik.values.after_tax_calcs : false,
      TAXRATEFEDINCOME: formik.values.fed_tax_rate,
      TAXRATESTATEINCOME: Number(formik.values.state_tax_rate),
      STATEOFISSUE: formik.values.state_of_issue.value,
      STATEOFRESIDENCE: formik.values.state_of_residence.value,
    };
  }

  if (securityTypeValueLabel.label === SECURITY_TYPE_VALUES.Floater) {
    calculateRequest = {
      ...calculateRequest,
      // Floater values
      RESETPERIODICITY:
        securityTypeValueLabel.label === SECURITY_TYPE_VALUES.Floater ? formik.values.rate_reset_frequency.value : '',
      USEFIXINGCURVEYN:
        securityTypeValueLabel.label === SECURITY_TYPE_VALUES.Floater ? formik.values.using_fixing_curve : false,
    };
  }

  if (
    filteredCallsData &&
    filteredCallsData.CALLPRC.length > 0 &&
    filteredCallsData.DTCALL.length > 0 &&
    selectedAddOnHeading === CALLS
  ) {
    calculateRequest = {
      ...calculateRequest,
      DTCALL: filteredCallsData.DTCALL,
      CALLPRC: filteredCallsData.CALLPRC,
    };
  }

  if (filteredSinksData && filteredSinksData.length > 0 && selectedAddOnHeading === SINKS) {
    calculateRequest = {
      ...calculateRequest,
      DTSINK: filteredSinksData.map((item: any) => item.DTSINK),
      SINKAMT: filteredSinksData.map((item: any) => item.SINKAMT),
      SINKPRC: filteredSinksData.map((item: any) => item.SINKPRC),
    };
  }

  if (parCurve && selectedAddOnHeading === FIXING_CURVE) {
    calculateRequest = {
      ...calculateRequest,
      FIXINGPARYN: parCurve,
      FIXINGTENOR: fixingMaturityValues,
      FIXINGRT: fixingRateValues,
    };
  }

  if (spotCurve && selectedAddOnHeading === DISCOUNT_CURVE) {
    calculateRequest = {
      ...calculateRequest,
      DISCRTPARYN: spotCurve,
      DISCMATLEN: discountMaturityValues,
      DISCRT: discountRateValues,
    };
  }

  const securityType = {
    show: selectedSecurityTypes.label === SECURITY_TYPE_VALUES.Floater ? true : false,
    value: selectedSecurityTypes.label === SECURITY_TYPE_VALUES.Floater ? selectedSecurityTypes.label : '',
  };

  const addOnsValue = {
    show: !selectedAddOnHeading ? false : selectedAddOnHeading !== 'None' ? true : false,
    value:
      selectedAddOnHeading === CALLS
        ? callsData
        : selectedAddOnHeading === SINKS
          ? sinksData
          : selectedAddOnHeading === fixingCurveData
            ? fixingCurveData
            : selectedAddOnHeading === DISCOUNT_CURVE
              ? discountCurveData
              : '',
    type: selectedAddOnHeading,
  };

  const calculateTradeRequest = {
    ...calculateRequest,
    security_type: securityType,
    add_ons_value: addOnsValue,
  };

  const mutation = useMutation({
    mutationFn: () => {
      return CalculateTrade(calculateRequest);
    },

    onSuccess: (data: any) => {
      const resData = data.data.data;

      setResultSearchShow(false);

      localStorage.setItem('responseTrade', JSON.stringify(resData));

      if (resData) {
        const requiredData = generateCalculateTradeData(resData);
        setCalculateTradeResponseData(requiredData);
        setSearchTradeResponseData(requiredData);
        toastSuccess(TOAST_MESSAGES.TRADE_CREATED);
      }
    },
    onError: (err) => {
      toastError(err.message);
    },
  });

  const handleClearTrade = () => {
    localStorage.removeItem(CALLS);
    localStorage.removeItem(SINKS);
    localStorage.removeItem(FIXING_CURVE);
    localStorage.removeItem(DISCOUNT_CURVE);
    localStorage.removeItem(SPOT_CURVE);
    localStorage.removeItem(PAR_CURVE);
    localStorage.removeItem('responseTrade');

    setSelectedAddOnHeading('None');
    setSearchTradeResponseData({});
    setCalculateTradeResponseData({});
    setResultSearchShow(false);

    setSearchSelectedData({});

    setSecurityId('');
    setSearchTradeId('');

    setShowSearchResult(false);
    setSearchSelectedData(null);

    setShouldReinitialize(false);

    formik.resetForm({ values: emptyInitialValues });
    setSearchValue('');
    toastSuccess('All Values is Removed');
  };

  const getAllSecurities = getSecurityTypeData.map((item: ISecurityTypeBackendData) => ({
    id: item.id,
    value: item.value,
    label: item.instrument_type,
  }));

  const searchSecurityTypeData: { id: string; value: string; label: string } | undefined = getAllSecurities.find(
    (item) => item.value === formik.values.security_type,
  );

  useEffect(() => {
    setTimeout(() => {
      if (searchSelectedData && searchSelectedData?.request?.add_ons_value?.type) {
        setSelectedAddOnHeading(searchSelectedData?.request?.add_ons_value?.type);
      }
    }, 100);
  }, [searchSelectedData?.request?.add_ons_value?.type]);

  return (
    <TradeLayout>
      <Stack
        sx={{
          margin: { lg: '0 5.56rem 0 2.31rem', xs: '0 1rem' },
          maxWidth: { xl: '90rem', xs: '100%' },
        }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <StyledSaveButtonContainer>
          <StyledSaveButtonSubContainer onClick={handleSaveButtonClick} direction={'row'}>
            <TextXs
              sx={{
                color: 'var(--text-black)',
                letterSpacing: '0.0075rem',
              }}
              text={BUTTON_TEXT.SEARCH_RESULTS}
            />
            <Image priority src={SearchIcon} alt={'icon'} width={20} height={20} />
          </StyledSaveButtonSubContainer>
        </StyledSaveButtonContainer>

        <Stack
          sx={{
            gap: '1.44rem',
          }}
        >
          <TradeDetails
            searchSelectedData={searchSelectedData}
            setSelectedSecurityTypes={setSelectedSecurityTypes}
            setSecurityId={setSecurityId}
            getSecurityTypeData={getSecurityTypeData}
            formik={formik}
            securityTypeValueLabel={securityTypeValueLabel}
            setSecurityTypeValueLabel={setSecurityTypeValueLabel}
          />

          <AddOnDetails
            selectedAddOnHeading={selectedAddOnHeading}
            setSelectedAddOnHeading={setSelectedAddOnHeading}
            parCurve={parCurve}
            setParCurve={setParCurve}
            spotCurve={spotCurve}
            setSpotCurve={setSpotCurve}
          />
        </Stack>

        <StyledButtonTradeContainer
          direction={{ sm: 'row', xs: 'column' }}
          sx={{
            alignItems: 'center',
            marginTop: '2.06rem',
            gap: { sm: '1.5rem', xs: '1rem' },
          }}
        >
          <CustomButton
            loading={mutation.isPending}
            type="submit"
            text={BUTTON_TEXT.CALCULATE}
            sx={{
              backgroundColor: 'var(--sky-blue)',
              width: { sm: '12.5rem', xs: '100%' },
              fontSize: '0.9375rem',
              fontWeight: 500,
              lineHeight: '1.625rem',
              letterSpacing: '0.02875rem',
            }}
          />
          <OutLineButton
            onClick={handleClearTrade}
            text={BUTTON_TEXT.CLEAR_CONTENT}
            sx={{
              border: '1px solid var(--border-grey-200)',
              color: 'var(--text-grey-100)',
              width: { sm: '10rem', xs: '100%' },
              fontSize: '0.9375rem',
              fontWeight: 500,
              lineHeight: '1.625rem',
              letterSpacing: '0.02875rem',
              ':hover': {
                color: 'var(--text-grey-100)',
              },
            }}
          />
        </StyledButtonTradeContainer>

        <Result
          setSearchTradeId={setSearchTradeId}
          setShowSearchResult={setShowSearchResult}
          setShouldReinitialize={setShouldReinitialize}
          setResultSearchShow={setResultSearchShow}
          setSearchSelectedData={setSearchSelectedData}
          calculateTradeRequest={calculateTradeRequest}
          searchSecurityTypeId={searchSecurityTypeData?.id}
          setSelectedAddOnHeading={setSelectedAddOnHeading}
          securityId={securityId}
          resultSearchShow={resultSearchShow}
          setSearchTradeResponseData={setSearchTradeResponseData}
          searchResultsData={searchTradeResponseData}
          formik={formik}
          calculateTradeResponseData={calculateTradeResponseData}
          setCalculateTradeResponseData={setCalculateTradeResponseData}
          setSearchValue={setSearchValue}
        />
        <SearchResult
          setResultSearchShow={setResultSearchShow}
          setSelectedAddOnHeading={setSelectedAddOnHeading}
          setSearchTradeId={setSearchTradeId}
          showSaveResult={showSearchResult}
          setShowSaveResult={setShowSearchResult}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setShouldReinitialize={setShouldReinitialize}
        />
      </Stack>
    </TradeLayout>
  );
};

export default Trade;
