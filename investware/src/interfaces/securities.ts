export interface ISecurityType {
  label: string;
  value: string;
}

export interface ISecuritySelectedType {
  id: string;
  value: string;
  label: string;
}

export interface ISecurityTypeValueDes {
  type: string;
  des: string;
}

export interface ISecurityTypeField {
  value: string;
}

export interface ISecurityTypeBackendData {
  id: string;
  value: string;
  instrument_type: string;
  desc: string;
  created_at: string;
  updated_at: string;
}

export const securityTypeValueDes: ISecurityTypeValueDes[] = [
  {
    type: 'AUD',
    des: 'Australian dollar',
  },
  {
    type: 'CAD',
    des: 'Canadian dollar',
  },
  {
    type: 'CANGOVT-Semi-Act/365',
    des: 'Canadian Government Semu+I Annual Interest Act/365 Daycount',
  },
  {
    type: 'CD-30/360',
    des: 'Certificate of Deposit-30/360 Daycount',
  },
  {
    type: 'CD-ACT/360',
    des: 'Certificate of Deposit-Act/360 Daycount',
  },

  {
    type: 'EUR',
    des: 'Euros',
  },
  {
    type: 'EURO-Semi-30E/360',
    des: 'EU',
  },
  {
    type: 'FLOATER-Qrtly-Monthly-Act/Act',
    des: 'US Floating Rate Note Pays Qrtly Reset Qrtly Act/Act',
  },
  {
    type: 'FLOATER-Semi-Monthly-Act/Act',
    des: 'US Floating Rate Note pays Semi Resets Qrtly Act/Act',
  },

  {
    type: 'FLOATER-Semi-Qrtly-Act/Act',
    des: 'US Floating Rate Note Semi Annual Interest Act/Act Daycount',
  },
  {
    type: 'GBP',
    des: 'Pounds',
  },
  {
    type: 'INDEX-ILR-Semi-Act',
    des: 'Israel Index Adjusted Semi Annual Interest  Act/Act Daycount',
  },
  {
    type: 'INDEX-USA-Semi-Act',
    des: 'US Index Adjusted Semi Annual Interest Act/Act Daycount',
  },
  {
    type: 'JPY',
    des: 'Yen',
  },

  {
    type: 'MORT-Monthly-30/360',
    des: 'Mortgage',
  },
  {
    type: 'MUNI-Semi-30/360',
    des: 'Muni Semi Annual interest 30/360 Daycount',
  },
  {
    type: 'OAT-Semi-Act/Act',
    des: 'French  OAT Semi-annaul interest Act/Act Daycount',
  },
  {
    type: 'USCORP-Qrtly-30/360',
    des: 'US Corp Quarterly interest 30/360 basis',
  },

  {
    type: 'USCORP-Semi-30/360',
    des: 'US Corp Semi-annual interest 30/360 Daycount',
  },

  {
    type: 'USD',
    des: 'US Dollars',
  },

  {
    type: 'USTBILL',
    des: 'US Treas Bill',
  },

  {
    type: 'USTBOND',
    des: 'US Treas Bond',
  },
  {
    type: 'USTNOTE',
    des: 'US Treas Note',
  },

  {
    type: 'ZERO-Act/360',
    des: 'Zero Coupon Bond',
  },
];
