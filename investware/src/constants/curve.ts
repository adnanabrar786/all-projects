import { IMultiValueTableHeading } from '@/interfaces/addons';

export const FIXING_CURVE_TABLE_HEADING: IMultiValueTableHeading[] = [
  {
    field: 'Maturity',
    headerName: 'Maturity(mos)',
    width: 150,
    editable: true,
    type: 'number',
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'Rate',
    headerName: 'Rate(%)',
    width: 150,
    editable: true,
    type: 'number',
    align: 'left',
    headerAlign: 'left',
  },
];

export const DISCOUNT_CURVE_TABLE_HEADING: IMultiValueTableHeading[] = [
  {
    field: 'Maturity',
    headerName: 'Maturity(mos)',
    width: 150,
    editable: true,
    type: 'number',
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'Rate',
    headerName: 'Rate(%)',
    width: 150,
    editable: true,
    type: 'number',
    align: 'left',
    headerAlign: 'left',
  },
];
