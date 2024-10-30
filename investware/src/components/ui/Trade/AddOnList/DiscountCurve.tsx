import CustomInput from '@/components/common/Input/CustomInput';
import { DISCOUNT_CURVE_TABLE_HEADING } from '@/constants/curve';
import { checkBlue, UnCheck } from '@/constants/images.routes';
import { ADD_ON_LIST } from '@/constants/locales';
import { useUserContext } from '@/context/user/UserContext';
import { ADDON_TYPES } from '@/interfaces/addons';
import { Box, Grid, Stack } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MultiValues from '../multiValueTable/MultiValues';

const { DISCOUNT_CURVE } = ADDON_TYPES;

interface Props {
  selectedHeading?: string;
  spotCurve?: boolean;
  setSpotCurve: (parCurve: boolean) => void;
}

const DiscountCurve = ({ selectedHeading, spotCurve, setSpotCurve }: Props) => {
  const { totalMultiValueCount, setTotalMultiValueCount } = useUserContext();

  const [singleRow, setSingleRow] = useState<any>(null);
  const [maturity, setMaturity] = useState('');
  const [Rate, setRate] = useState('');

  useEffect(() => {
    setSingleRow(
      localStorage.getItem(DISCOUNT_CURVE)
        ? JSON.parse(localStorage.getItem(DISCOUNT_CURVE)!)[0]
        : [
            {
              id: 0,
              Maturity: '',
              Rate: '',
              add: '+',
              sub: '-',
            },
          ],
    );
  }, []);

  useEffect(() => {
    if (singleRow) {
      if (singleRow.Maturity) {
        setMaturity(singleRow.Maturity);
      } else {
        setMaturity('');
      }

      if (singleRow.Rate) {
        setRate(singleRow.Rate);
      } else {
        setRate('');
      }
    }
  }, [singleRow]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <CustomInput
            onClick={() => {
              setSpotCurve(!spotCurve);
            }}
            value={`${ADD_ON_LIST.SPOT_CURVE}?`}
            endAdornment={
              <Stack
                sx={{
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
              >
                <Image priority src={spotCurve ? checkBlue : UnCheck} alt={'icon'} width={20} height={20} />
              </Stack>
            }
            sx={{ pointerEvents: 'none' }}
          />
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <CustomInput
            label={`${ADD_ON_LIST.MATURITY_MOS}`}
            value={maturity}
            onChange={(e) => setMaturity(e.target.value)}
            sx={{ pointerEvents: 'none' }}
            disabled={spotCurve ? false : true}
          />
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <CustomInput
            label={`${ADD_ON_LIST.RATE}(%)`}
            value={Rate}
            onChange={(e) => setRate(e.target.value)}
            sx={{ pointerEvents: 'none' }}
            disabled={spotCurve ? false : true}
          />
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <CustomInput
            label={ADD_ON_LIST.TOTAL_ROWS}
            value={totalMultiValueCount}
            sx={{ pointerEvents: 'none' }}
            disabled={spotCurve ? false : true}
          />
        </Grid>
      </Grid>

      <MultiValues
        disableMultiValue={!spotCurve}
        setSingleRow={setSingleRow}
        selectedHeading={selectedHeading}
        tableHeading={DISCOUNT_CURVE_TABLE_HEADING}
      />
    </Box>
  );
};

export default DiscountCurve;
