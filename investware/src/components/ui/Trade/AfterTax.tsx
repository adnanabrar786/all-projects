import CustomInput from '@/components/common/Input/CustomInput';
import SearchableInputSecurityType from '@/components/common/Input/SearchableInputSecurityType';
import TextMd from '@/components/common/Text/TextMd';
import { Trade_List } from '@/constants/locales';
import { stateData } from '@/constants/securities';
import { Grid, Stack } from '@mui/material';

interface Props {
  formik: any;
}

const AfterTax = ({ formik }: Props) => {
  const handleStateOfIssue = (value: { label: string; value: string }) => {
    formik.setFieldValue('state_of_issue', value);
  };

  const handleStateOfResidence = (value: { label: string; value: string }) => {
    formik.setFieldValue('state_of_residence', value);
  };
  return (
    <Stack
      sx={{
        marginTop: '1.25rem',
      }}
    >
      <TextMd
        text={'After Tax Calculation'}
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
              label={Trade_List.FED_TAX_RATE}
              name="fed_tax_rate"
              value={formik.values.fed_tax_rate ?? ''}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CustomInput
              type="number"
              label={Trade_List.STATE_TAX_RATE ?? ''}
              name="state_tax_rate"
              value={formik.values.state_tax_rate}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <SearchableInputSecurityType
              data={stateData}
              value={formik.values.state_of_issue}
              setValue={handleStateOfIssue}
              label={Trade_List.STATE_OF_ISSUE}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <SearchableInputSecurityType
              data={stateData}
              value={formik.values.state_of_residence}
              setValue={handleStateOfResidence}
              label={Trade_List.STATE_OF_RESIDENCE}
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default AfterTax;
