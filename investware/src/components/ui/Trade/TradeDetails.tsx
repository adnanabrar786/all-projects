import CustomAccordion from '@/components/common/Accordion/CustomAccordion';
import { StyledAccordionIcon } from '@/components/common/Accordion/CustomAccordionIconStyled';
import CustomDatePicker from '@/components/common/CustomDatePicker/CustomDatePicker';
import CustomInput from '@/components/common/Input/CustomInput';
import SearchableInputSecurityType from '@/components/common/Input/SearchableInputSecurityType';
import SearchSecurityType from '@/components/common/Input/SearchSecurityType';
import CustomTooltip from '@/components/common/Tooltip/CustomTooltip';
import { StyledTradeDetailsContainer } from '@/components/ui/Trade/TradeStyled';
import { Exclude_Holidays_List } from '@/constants/constant';
import { checkBlue, GreyInfo, RoundArrow, UnCheck } from '@/constants/images.routes';
import { Trade_List } from '@/constants/locales';
import {
  ISecuritySelectedType,
  ISecurityType,
  ISecurityTypeBackendData,
  securityTypeValueDes,
} from '@/interfaces/securities';
import { GetSearchSecurity } from '@/services/trade.services';
import { Grid, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import AfterTax from './AfterTax';
import SecurityType from './SearchList/SecurityType';

interface Props {
  formik: any;
  getSecurityTypeData: ISecurityTypeBackendData[];
  setSecurityId: (value: string) => void;
  securityTypeValueLabel: ISecurityType;
  setSecurityTypeValueLabel: (value: ISecurityType) => void;
  setSelectedSecurityTypes: (value: ISecuritySelectedType) => void;
  searchSelectedData: any;
}

const TradeDetails = ({
  formik,
  getSecurityTypeData,
  setSecurityId,
  securityTypeValueLabel,
  setSecurityTypeValueLabel,
  setSelectedSecurityTypes,
  searchSelectedData,
}: Props) => {
  const [securityTypeValue, setSecurityTypeValue] = useState(formik.values.security_type);

  const [showSecurityTypeList, setShowSecurityTypeList] = useState(false);
  const [selectedSecurityTypeValue, setSelectedSecurityTypeValue] = useState('');
  const [storedSecurityTypeValue, setStoredSecurityTypeValue] = useState(null);

  const [manualEntryToggle, setManualEntryToggle] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleToggleAccordion = (isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const handleSecurityType = (value: string) => {
    setSecurityTypeValue(value);
    formik.setFieldValue('security_type', value);
  };

  useEffect(() => {
    setSecurityTypeValue(formik.values.security_type);
  }, [formik.values.security_type]);

  const getAllSecurities = getSecurityTypeData.map((item: ISecurityTypeBackendData) => ({
    id: item.id,
    value: item.value,
    label: item.instrument_type,
  }));

  const handleSelectSecurityType = (val: any) => {
    const selectedSecurityId = getAllSecurities.find((item) => item.id === val.id);

    if (selectedSecurityId) {
      setSecurityId(selectedSecurityId.id);
      setSelectedSecurityTypes(selectedSecurityId);
    }

    setSecurityTypeValueLabel({ label: val.label, value: val.value });
    setSecurityTypeValue(val.value);
    formik.setFieldValue('security_type', val.value);
    setShowSecurityTypeList(false);
    setSelectedSecurityTypeValue(val.value);

    mutation.mutate();
  };

  const mutation = useMutation({
    mutationFn: () => GetSearchSecurity(selectedSecurityTypeValue),
    onSuccess: async (data: any) => {
      setStoredSecurityTypeValue(data.data.data);
    },
    onError: (error) => {},
  });

  return (
    <StyledTradeDetailsContainer>
      <CustomAccordion
        headerTextHeading="Trade"
        manualEntryText="Manual Entry"
        manualEntryToggle={manualEntryToggle}
        setManualEntryToggle={setManualEntryToggle}
        description={formik.values.security_description}
        settle_Date={formik.values.settle_date}
        price={formik.values.price}
        sxMainHeading={{
          justifyContent: 'space-between',
        }}
        sxSummary={{
          alignItems: 'flex-start ',
          '.MuiAccordionSummary-expandIconWrapper': {
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.5s ease',
            marginTop: expanded ? '22px' : '14px',
          },
        }}
        expandIcon={
          <StyledAccordionIcon>
            <Image priority src={RoundArrow} alt={'icon'} fill />
          </StyledAccordionIcon>
        }
        onAccordionChange={handleToggleAccordion}
      >
        <Stack
          sx={{
            paddingBottom: { md: '1.2rem', xs: '0.75rem' },
          }}
        >
          <Stack direction={'row'}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <CustomInput
                  label={Trade_List.SECURITY}
                  name="security_description"
                  value={formik.values.security_description}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <SearchSecurityType
                  handleSelect={handleSelectSecurityType}
                  showList={showSecurityTypeList}
                  setShowList={setShowSecurityTypeList}
                  value={securityTypeValue}
                  setValue={handleSecurityType}
                  data={getAllSecurities}
                  label={`${Trade_List.SECURITY_TYPE}*`}
                  error={formik.touched.security_type && Boolean(formik.errors.security_type)}
                  helperText={
                    formik.touched.security_type && (formik.errors.security_type || formik.errors.security_type)
                  }
                  customIcon={
                    <CustomTooltip
                      title={
                        securityTypeValueLabel?.value
                          ? securityTypeValueDes.find((item) => item.type === securityTypeValueLabel.value)?.des
                          : 'No Description'
                      }
                      placement="bottom"
                    >
                      <Image priority src={GreyInfo} alt={'icon'} width={16} height={16} />
                    </CustomTooltip>
                  }
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <CustomInput
                  label={Trade_List.SECURITY_ID}
                  name="security_id"
                  value={formik.values.security_id}
                  onChange={formik.handleChange}
                />
              </Grid>

              {manualEntryToggle && (
                <Fragment>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <CustomInput
                      label={Trade_List.ISSUER}
                      name="issuer"
                      value={formik.values.issuer}
                      onChange={formik.handleChange}
                    />
                  </Grid>

                  {securityTypeValue !== 'ZERO-Act/360' && securityTypeValue !== 'USTBILL' && (
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <CustomInput
                        type="number"
                        label={`${Trade_List.COUPONS}*`}
                        name="coupons"
                        value={formik.values.coupons}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                  )}

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <CustomDatePicker
                      label={`${Trade_List.MATURITY}*`}
                      value={formik.values.maturity_date ? dayjs(formik.values.maturity_date) : null}
                      onChange={(date: Dayjs | null) => {
                        const formattedDate = date ? date : null;
                        formik.setFieldValue('maturity_date', formattedDate);
                      }}
                      error={formik.touched.maturity_date && Boolean(formik.errors.maturity_date)}
                      helperText={formik.touched.maturity_date && formik.errors.maturity_date}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <CustomInput
                      type="number"
                      label={`${Trade_List.PAR}*`}
                      name="par"
                      value={formik.values.par ?? ''}
                      onChange={formik.handleChange}
                      error={formik.touched.par && Boolean(formik.errors.par)}
                      helperText={formik.touched.par && formik.errors.par}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <CustomDatePicker
                      label={`${Trade_List.SETTLE_DATE}*`}
                      value={formik.values.settle_date ? dayjs(formik.values.settle_date) : null}
                      onChange={(date: Dayjs | null) => {
                        const formattedDate = date ? date : null;
                        formik.setFieldValue('settle_date', formattedDate);
                      }}
                      error={formik.touched.settle_date && Boolean(formik.errors.settle_date)}
                      helperText={formik.touched.settle_date && formik.errors.settle_date}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <CustomInput
                      type="number"
                      label={`${Trade_List.PRICE_YIELD}*`}
                      name="price_yield"
                      value={formik.values.price_yield ?? ''}
                      onChange={formik.handleChange}
                      error={formik.touched.price_yield && Boolean(formik.errors.price_yield)}
                      helperText={formik.touched.price_yield && formik.errors.price_yield}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <CustomDatePicker
                      label={Trade_List.DATED}
                      value={formik.values.dated ? dayjs(formik.values.dated) : null}
                      onChange={(date: Dayjs | null) => {
                        const formattedDate = date ? date : null;
                        formik.setFieldValue('dated', formattedDate);
                      }}
                      error={formik.touched.dated && Boolean(formik.errors.dated)}
                      helperText={formik.touched.dated && formik.errors.dated}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <CustomDatePicker
                      label={Trade_List.FIRST_COUPON}
                      value={formik.values.first_coupon ? dayjs(formik.values.first_coupon) : null}
                      onChange={(date: Dayjs | null) => {
                        const formattedDate = date ? date : null;
                        formik.setFieldValue('first_coupon', formattedDate);
                      }}
                      error={formik.touched.first_coupon && Boolean(formik.errors.first_coupon)}
                      helperText={formik.touched.first_coupon && formik.errors.first_coupon}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <SearchableInputSecurityType
                      label={Trade_List.EXCLUDE_HOLIDAYS}
                      value={formik.values.exclude_holidays}
                      setValue={(value: { label: string; value: string }) => {
                        formik.setFieldValue('exclude_holidays', value);
                      }}
                      data={Exclude_Holidays_List}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <CustomInput
                      onClick={() => {
                        formik.setFieldValue('after_tax_calcs', !formik.values.after_tax_calcs);
                      }}
                      name="after_tax_calcs"
                      value={formik.values.after_tax_calcs ? Trade_List.AFTER_TAX_CALCS : Trade_List.AFTER_TAX_CALCS}
                      onChange={formik.handleChange}
                      sx={{
                        cursor: 'pointer',
                      }}
                      sxTextField={{
                        pointerEvents: 'none',
                        color: 'red',
                        '.MuiOutlinedInput-input': {
                          color: formik.values.after_tax_calcs ? 'var(--text-black)' : 'var(--text-grey-100)',
                        },
                      }}
                      endAdornment={
                        <Stack
                          sx={{
                            cursor: 'pointer',
                          }}
                        >
                          <Image
                            priority
                            src={formik.values.after_tax_calcs ? checkBlue : UnCheck}
                            alt={'icon'}
                            width={20}
                            height={20}
                          />
                        </Stack>
                      }
                    />
                  </Grid>
                </Fragment>
              )}
            </Grid>
          </Stack>

          {formik.values.after_tax_calcs && <AfterTax formik={formik} />}

          <SecurityType
            securityTypeValueLabel={securityTypeValueLabel}
            securityTypeApiData={searchSelectedData?.request?.security_type?.value}
            formik={formik}
          />
        </Stack>
      </CustomAccordion>
    </StyledTradeDetailsContainer>
  );
};

export default TradeDetails;
