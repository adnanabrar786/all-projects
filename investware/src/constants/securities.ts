import { ISecurityType } from '@/interfaces/securities';

export const securityTypeJavaCode: any[] = [
  {
    value: 'CANGOVT-Semi-Act/365',
  },
  {
    value: 'CD-30/360',
  },
  {
    value: 'CD-ACT/360',
  },
  {
    value: 'CURRENCY',
  },
  {
    value: 'FLOATER-Qrtly Interest-Act/Act daycount',
  },
  {
    value: 'FLOATER-Qrtly-Act/Act-Monthly',
  },
  {
    value: 'FLOATER-Semi-Act/Act-Monthly',
  },
  {
    value: 'FLOATER-Semi-Act/Act-Qrtly',
  },
  {
    value: 'INDEXILR-Semi-Act',
  },
  {
    value: 'INDEXUSA-Semi-Act',
  },
  {
    value: 'MORT-Monthly-30/360',
  },
  {
    value: 'MUNI-Semi-30/360',
  },
  {
    value: 'OAT-Semi-Act/Act',
  },
  {
    value: 'USCORP-Qrtly-30/360',
  },
  {
    value: 'USCORP-Semi-30/360',
  },
  {
    value: 'USTBILL',
  },

  {
    value: 'USTBOND',
  },
  {
    value: 'USTNOTE',
  },
  {
    value: 'ZERO Coupon-Act/360',
  },
];

export const securityTypeNewJavaCode: any[] = [
  {
    id: 0,
    value: 'AUD',
  },
  {
    id: 1,
    value: 'CAD',
  },
  {
    id: 2,
    value: 'CANGOVT-Semi-Act/365',
  },
  {
    id: 3,
    value: 'CD-30/360',
  },
  {
    id: 4,
    value: 'CD-ACT/360',
  },
  {
    id: 5,
    value: 'EUR',
  },
  {
    id: 6,
    value: 'EURO-Semi-30E/360',
  },
  {
    id: 7,
    value: 'FLOATER-Qrtly-Monthly-Act/Act',
  },
  {
    id: 8,
    value: 'FLOATER-Semi-Monthly-Act/Act',
  },
  {
    id: 9,
    value: 'FLOATER-Semi-Qrtly-Act/Act',
  },
  {
    id: 10,
    value: 'GBP',
  },

  {
    id: 11,
    value: 'INDEX-ILR-Semi-Act',
  },
  {
    id: 12,
    value: 'INDEX-USA-Semi-Act',
  },
  {
    id: 13,
    value: 'JPY',
  },
  {
    id: 14,
    value: 'MORT-Monthly-30/360',
  },
  {
    id: 15,
    value: 'MUNI-Semi-30/360',
  },

  {
    id: 16,
    value: 'OAT-Semi-Act/Act',
  },
  {
    id: 17,
    value: 'USCORP-Qrtly-30/360',
  },
  {
    id: 18,
    value: 'USCORP-Semi-30/360',
  },
  {
    id: 20,
    value: 'USD',
  },

  {
    id: 21,
    value: 'USTBILL',
  },

  {
    id: 22,
    value: 'USTBOND',
  },
  {
    id: 23,
    value: 'USTNOTE',
  },
  {
    id: 24,
    value: 'ZERO Coupon-Act/360',
  },
];

export const SECURITY_TYPE_VALUES = {
  Mortgage: 'Mortgage',
  Indexed: 'Indexed',
  Floater: 'FLOATER',
  Discount: 'DISCOUNT',
};

export const RateResetFrequencyData: ISecurityType[] = [
  {
    value: '1M',
    label: 'Every Month',
  },
  {
    value: '2M',
    label: 'BiMonthly',
  },
  {
    value: '3M',
    label: 'TriMonthly',
  },
  {
    value: '6M',
    label: 'Semi-Annual',
  },
  {
    value: '12M',
    label: 'Annual',
  },
  {
    value: '1W',
    label: 'Ever Week',
  },
  {
    value: '2W',
    label: 'BiWeekly',
  },
  {
    value: '3W',
    label: 'Tri-Weekly',
  },
  {
    value: '4W',
    label: 'Every 4 weeks',
  },
  {
    value: '91D',
    label: 'Every 91 days',
  },
  {
    value: '181D',
    label: 'Every 181 days',
  },
];

export const prePayModelData: ISecurityType[] = [
  {
    value: 'CPR',
    label: 'Conditional prepayment rate',
  },
  {
    value: 'PSA',
    label: 'Public Securities Association',
  },
  {
    value: 'ABS',
    label: 'Absolute Prepayment',
  },
];

export const stateData: ISecurityType[] = [
  { value: 'AL', label: ' Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },

  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },

  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },

  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Lowa' },
  { value: 'KS', label: 'Kansas' },

  { value: 'kY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },

  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },

  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },

  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'Ney York' },

  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },

  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },

  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },

  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },

  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];
