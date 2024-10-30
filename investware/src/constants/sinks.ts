import { IMultiValueTableHeading } from '@/interfaces/addons';

export const SINKS_TABLE_HEADING: IMultiValueTableHeading[] = [
  {
    field: 'SinksDate',
    headerName: 'Sinks Date*',
    width: 150,
    editable: false,
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
