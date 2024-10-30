import { IMultiValueTableHeading } from '@/interfaces/addons';

export const CALLS_TABLE_HEADING: IMultiValueTableHeading[] = [
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
  },
];
