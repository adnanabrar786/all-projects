import CustomInput from '@/components/common/Input/CustomInput';
import SearchableInputSecurityType from '@/components/common/Input/SearchableInputSecurityType';
import TextMd from '@/components/common/Text/TextMd';
import { checkBlue, GreyInfo, UnCheck } from '@/constants/images.routes';
import { Trade_List } from '@/constants/locales';
import { RateResetFrequencyData } from '@/constants/securities';
import { Grid, Stack } from '@mui/material';
import Image from 'next/image';

interface Props {
  formik: any;
}

const Floater = ({ formik }: Props) => {
  const handleRateResetFrequency = (value: { label: string; value: string }) => {
    formik.setFieldValue('rate_reset_frequency', value);
  };

  return (
    <Stack
      sx={{
        marginTop: '1.25rem',
      }}
    >
      <TextMd
        text={'Floater'}
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
            <SearchableInputSecurityType
              value={formik.values.rate_reset_frequency}
              setValue={handleRateResetFrequency}
              data={RateResetFrequencyData}
              label={Trade_List.RATE_RESET_FREQUENCY}
              customIcon={<Image priority src={GreyInfo} alt={'icon'} width={16} height={16} />}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CustomInput
              onClick={() => {
                formik.setFieldValue('using_fixing_curve', !formik.values.using_fixing_curve);
              }}
              name="using_fixing_curve"
              value={`${Trade_List.USE_FIXING_CURVE}?`}
              onChange={formik.handleChange}
              sx={{
                cursor: 'pointer',
              }}
              sxTextField={{
                pointerEvents: 'none',
                color: 'red',
                '.MuiOutlinedInput-input': {
                  color: formik.values.using_fixing_curve ? 'var(--text-black)' : 'var(--text-grey-100)',
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
                    src={formik.values.using_fixing_curve ? checkBlue : UnCheck}
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

export default Floater;
