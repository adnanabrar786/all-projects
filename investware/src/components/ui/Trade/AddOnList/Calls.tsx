import CustomDatePicker from '@/components/common/CustomDatePicker/CustomDatePicker';
import CustomInput from '@/components/common/Input/CustomInput';
import TextXs from '@/components/common/Text/TextXs';
import { Calender } from '@/constants/images.routes';
import { ADD_ON_LIST } from '@/constants/locales';
import { useUserContext } from '@/context/user/UserContext';
import { ADDON_TYPES, IMultiValueTableHeading } from '@/interfaces/addons';
import { Box, Grid, Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MultiValues from '../multiValueTable/MultiValues';
const { CALLS } = ADDON_TYPES;

interface Props {
  selectedHeading?: string;
}

const Calls = ({ selectedHeading }: Props) => {
  const CALLS_TABLE_HEADING: IMultiValueTableHeading[] = [
    {
      field: 'CallsPrices',
      headerName: 'Calls Prices',
      width: 150,
      editable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'CallsDate',
      headerName: 'Calls Date',
      width: 150,
      editable: true,
      renderCell: (params: any) => (
        <Stack
          direction={'row'}
          sx={{
            alignItems: 'center',
            height: '100%',
            width: '100%',
            cursor: 'pointer',
            justifyContent: 'space-between',
          }}
        >
          <TextXs text={params.value} />
          <Image priority src={Calender} alt={'icon'} width={20} height={20} />
        </Stack>
      ),
    },
  ];

  const { totalMultiValueCount, setTotalMultiValueCount } = useUserContext();

  const [callDate, setCallDate] = useState<Dayjs | null>(null);
  const [callPrice, setCallPrice] = useState('');
  const [singleRow, setSingleRow] = useState<any>();

  useEffect(() => {
    setSingleRow(
      localStorage.getItem(CALLS)
        ? JSON.parse(localStorage.getItem(CALLS)!)[0]
        : [{ id: 0, CallsPrices: '', CallsDate: '', add: '+', sub: '-' }],
    );
  }, []);

  useEffect(() => {
    if (singleRow) {
      if (singleRow.CallsDate) {
        setCallDate(dayjs(singleRow.CallsDate));
      } else {
        setCallDate(null);
      }

      if (singleRow.CallsPrices) {
        setCallPrice(singleRow.CallsPrices);
      } else {
        setCallPrice('');
      }
    }
  }, [singleRow]);

  // TODO: may be use later
  // setTotalMultiValueCount(callPrice === null ? 0 : totalMultiValueCount);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <CustomInput
            label={ADD_ON_LIST.CALL_PRICE}
            value={callPrice}
            onChange={(e) => setCallPrice(e.target.value)}
            sx={{ pointerEvents: 'none' }}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <CustomDatePicker
            label={`${ADD_ON_LIST.CALL_DATE}*`}
            value={callDate}
            onChange={(date: Dayjs | null) => {
              setCallDate(date);
            }}
            sxDatePicker={{ pointerEvents: 'none' }}
            hideCalender={true}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <CustomInput label={ADD_ON_LIST.TOTAL_ROWS} value={totalMultiValueCount} sx={{ pointerEvents: 'none' }} />
        </Grid>
      </Grid>
      <MultiValues setSingleRow={setSingleRow} tableHeading={CALLS_TABLE_HEADING} selectedHeading={selectedHeading} />
    </Box>
  );
};

export default Calls;
