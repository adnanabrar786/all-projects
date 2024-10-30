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

const { SINKS } = ADDON_TYPES;

interface Props {
  selectedHeading?: string;
}

const Sinks = ({ selectedHeading }: Props) => {
  const SINKS_TABLE_HEADING: IMultiValueTableHeading[] = [
    {
      field: 'SinksDate',
      headerName: 'Sinks Date',
      width: 150,
      editable: false,
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
    {
      field: 'SinksAmount',
      headerName: 'Sinks Amount',
      width: 150,
      editable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'SinksPrice',
      headerName: 'Sinks Price',
      width: 150,
      editable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
  ];

  const { totalMultiValueCount, setTotalMultiValueCount } = useUserContext();

  const [sinkDate, setSinkDate] = useState<Dayjs | null>(null);
  const [singleRow, setSingleRow] = useState<any>(null);
  const [sinkAmount, setSinkAmount] = useState('');
  const [sinkPrice, setSinkPrice] = useState('');

  useEffect(() => {
    setSingleRow(
      localStorage.getItem(SINKS)
        ? JSON.parse(localStorage.getItem(SINKS)!)[0]
        : [
            {
              id: 0,
              SinksDate: '',
              SinksAmount: '',
              SinksPrice: '',
              add: '+',
              sub: '-',
            },
          ],
    );
  }, []);

  useEffect(() => {
    if (singleRow) {
      if (singleRow.SinksDate) {
        setSinkDate(dayjs(singleRow.SinksDate));
      } else {
        setSinkDate(null);
      }

      if (singleRow.SinksAmount) {
        setSinkAmount(singleRow.SinksAmount);
      } else {
        setSinkAmount('');
      }

      if (singleRow.SinksPrice) {
        setSinkPrice(singleRow.SinksPrice);
      } else {
        setSinkPrice('');
      }
    }
  }, [singleRow]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <CustomDatePicker
            label={`${ADD_ON_LIST.SINK_DATE}*`}
            value={sinkDate}
            onChange={(date: Dayjs | null) => {
              setSinkDate(date);
            }}
            hideCalender={true}
            sxDatePicker={{ pointerEvents: 'none' }}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <CustomInput
            label={ADD_ON_LIST.SINK_AMOUNT}
            value={sinkAmount}
            onChange={(e) => setSinkAmount(e.target.value)}
            sx={{ pointerEvents: 'none' }}
          />
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <CustomInput
            label={ADD_ON_LIST.SINK_PRICE}
            value={sinkPrice}
            onChange={(e) => setSinkPrice(e.target.value)}
            sx={{ pointerEvents: 'none' }}
          />
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <CustomInput label={ADD_ON_LIST.TOTAL_ROWS} value={totalMultiValueCount} sx={{ pointerEvents: 'none' }} />
        </Grid>
      </Grid>
      <MultiValues setSingleRow={setSingleRow} tableHeading={SINKS_TABLE_HEADING} selectedHeading={selectedHeading} />
    </Box>
  );
};

export default Sinks;
