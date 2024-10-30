import CustomInput from '@/components/common/Input/CustomInput';
import TextMd from '@/components/common/Text/TextMd';
import { checkBlue, GreyInfo, UnCheck } from '@/constants/images.routes';
import { Trade_List } from '@/constants/locales';
import { Grid, Stack } from '@mui/material';
import Image from 'next/image';

interface Props {
  formik: any;
}

const Indexed = ({ formik }: Props) => {
  return (
    <Stack
      sx={{
        marginTop: '1.25rem',
      }}
    >
      <TextMd
        text={'Indexed'}
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
              label={Trade_List.INDEX_RATIO_AT_SETTLE}
              name="index_ratio_settle"
              value={formik.values.index_ratio_settle}
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
              label={`${Trade_List.INFLATION_RATE}(%)`}
              name="inflation_rate"
              value={formik.values.inflation_rate}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CustomInput
              onClick={() => {
                formik.setFieldValue('maturity_adjusted', !formik.values.maturity_adjusted);
              }}
              name="maturity_adjusted"
              value={`${Trade_List.MATURITY_ADJUSTED}?`}
              onChange={formik.handleChange}
              sx={{
                cursor: 'pointer',
              }}
              sxTextField={{
                pointerEvents: 'none',
                color: 'red',
                '.MuiOutlinedInput-input': {
                  color: formik.values.maturity_adjusted ? 'var(--text-black)' : 'var(--text-grey-100)',
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
                    src={formik.values.maturity_adjusted ? checkBlue : UnCheck}
                    alt={'icon'}
                    width={20}
                    height={20}
                  />
                </Stack>
              }
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Indexed;
