import CustomDatePicker from '@/components/common/CustomDatePicker/CustomDatePicker';
import CustomInput from '@/components/common/Input/CustomInput';
import SearchableInputSecurityType from '@/components/common/Input/SearchableInputSecurityType';
import TextMd from '@/components/common/Text/TextMd';
import { GreyInfo } from '@/constants/images.routes';
import { Trade_List } from '@/constants/locales';
import { prePayModelData } from '@/constants/securities';
import { Grid, Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';

interface Props {
  formik: any;
}

const Mortgage = ({ formik }: Props) => {
  const handlePrePayModal = (value: { label: string; value: string }) => {
    formik.setFieldValue('pre_pay_modal', value);
  };

  return (
    <Stack
      sx={{
        marginTop: '1.25rem',
      }}
    >
      <TextMd
        text={'Mortgage'}
        sx={{
          lineHeight: '160%',
          letterSpacing: '0.00938rem',
          fontStyle: '500',
          fontSize: { sm: '1.25rem', xs: '1.1rem' },
        }}
      />

      <Stack
        direction={'row'}
        sx={{
          marginTop: '1.25rem',
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CustomDatePicker
              label={Trade_List.LAST_FACTOR_DATE}
              value={formik.values.last_date_factor ? dayjs(formik.values.last_date_factor) : null}
              onChange={(date: Dayjs | null) => {
                const formattedDate = date ? date : null;
                formik.setFieldValue('last_date_factor', formattedDate);
              }}
              customIcon={<Image priority src={GreyInfo} alt={'icon'} width={16} height={16} />}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CustomInput
              type="number"
              endAdornment={
                <Stack
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Image priority src={GreyInfo} alt={'icon'} width={16} height={16} />
                </Stack>
              }
              label={Trade_List.WEGHTED_AVG_MATURITY_MOS}
              name="weghted_avg_maturity"
              value={formik.values.weghted_avg_maturity}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CustomInput
              type="number"
              endAdornment={
                <Stack
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Image priority src={GreyInfo} alt={'icon'} width={16} height={16} />
                </Stack>
              }
              label={Trade_List.FACTOR}
              name="factor"
              value={formik.values.factor}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <SearchableInputSecurityType
              label={Trade_List.PRE_PAY_MODEl}
              value={formik.values.pre_pay_modal}
              setValue={handlePrePayModal}
              data={prePayModelData}
              customIcon={<Image priority src={GreyInfo} alt={'icon'} width={16} height={16} />}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CustomInput
              type="number"
              endAdornment={
                // TODO: add tooltip when data will be provided
                // <CustomTooltip title={'This is custom Tool tip'} placement="bottom">
                <Stack
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Image priority src={GreyInfo} alt={'icon'} width={16} height={16} />
                </Stack>
                // </CustomTooltip>
              }
              label={`${Trade_List.PRE_PAY_SPEED}(%)`}
              name="pre_pay_speed"
              value={formik.values.pre_pay_speed}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Mortgage;
