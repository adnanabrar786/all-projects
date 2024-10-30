export enum ADDON_TYPES {
  SINKS = 'Sinks',
  CALLS = 'Calls',
  FIXING_CURVE = 'Fixing Curve',
  DISCOUNT_CURVE = 'Discount Curve',
  NONE = 'NONE',
}

export interface ITempRows {
  id: number;
  value: string[];
}

export interface IMultiValueTableHeading {
  field?: string;
  headerName?: string;
  width?: number;
  editable: boolean;
  renderCell?: (value: any) => void;
  type?: string;
  align?: string;
  headerAlign?: string;
}
