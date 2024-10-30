export interface IResetPassForm {
  email: string;
}

export interface IPlansAndBillings {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
  postalCode: string;
}

export interface selectedClientsProps {
  name: string;
  email: string;
  id: string;
}
export interface IProposalValueType {
  name: string;
  icon: string;
  value: number;
  fillColor: string;
}

export interface IHoldingSearch {
  name: string;
  type: string;
}

export interface IFINANCIALISTITEM {
  link: string;
  title: string;
  list: string[];
  icon: string;
  background: string;
}

export interface BOLDTEXT {
  item: string;
  itemPlain: string;
  topicDesc: string;
  setShow: (show: boolean) => void;
  index: number;
  id: string;
}
export interface PricePlan {
  title: string;
  heading: string;
  pricePara: string;
  para: string;
}

export interface IClientUploadImageDrawerData {
  id: number;
  name: string;
  subName: string;
  list: string[];
}

export interface ICustomTable {
  title: string;
  width?: string;
  colSpan: number;
}

export interface ICustomError {
  message: string;
}
