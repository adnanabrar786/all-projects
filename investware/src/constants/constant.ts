import { ISecurityType } from '@/interfaces/securities';
import { TradeFormValues } from '@/interfaces/trade';
import { Home, Setting } from './images.routes';
import { PROFILE, TRADE } from './routes/pages.routes';

export const profileList = [
  {
    text: 'Home',
    icon: Home,
    link: TRADE,
  },
  {
    text: 'Settings',
    icon: Setting,
    link: PROFILE,
  },
];

export const filterInputSearchList = [
  'Conditional prepayment rate',
  'Public Securities Association',
  'Absolute Prepayment',
  'Conditional prepayment rate',
  'Public Securities Association',
  'Absolute Prepayment',
  'Conditional prepayment rate',
  'Public Securities Association',
  'Absolute Prepayment',
];

export const Exclude_Holidays_List: ISecurityType[] = [
  {
    value: '0',
    label: 'Ignore holidays',
  },
  {
    value: '+',
    label: 'Move to next business day after holiday',
  },
  {
    value: '-',
    label: 'Move to business day prior to holiday',
  },
  {
    label:
      'Move to next business days after holiday unless next business day is in different month then move to prior business day',
    value: '+-',
  },
];

export const Pre_Pay_Model_List = ['CPR', 'PSA', 'ABS'];

export const State_Of_Issue_Residence_List = ['CPR', 'Alaska', 'ABS'];

export const emptyInitialValues: TradeFormValues = {
  security_type: '',
  security_id: '',
  security_description: '',
  issuer: '',
  maturity_date: null,
  settle_date: null,
  par: null,
  price_yield: null,
  dated: null,
  first_coupon: null,
  exclude_holidays: { label: '', value: '' },
  coupons: '',
  after_tax_calcs: false,
  fed_tax_rate: null,
  state_tax_rate: null,
  state_of_issue: { label: '', value: '' },
  state_of_residence: { label: '', value: '' },
  rate_reset_frequency: { label: '', value: '' },
  using_fixing_curve: false,
  // TODO: for future use if security is Mortgage and Indexed  types is exist
  // last_date_factor: null,
  // weghted_avg_maturity: null,
  // factor: null,
  // pre_pay_modal: { label: '', value: '' },
  // pre_pay_speed: null,
  // index_ratio_settle: null,
  // inflation_rate: null,
  // maturity_adjusted: false,
};
