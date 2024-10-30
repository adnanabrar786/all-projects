import { IRequest } from '@/interfaces/request';

export interface ICalculate {
  security_id: string;
  request: IRequest;
}

export interface ISaved {
  name: string;
  responseTrade: IRequest;
}

export interface TradeFormValues {
  security_type: string;
  security_id: string;
  security_description: string;
  issuer: string;
  maturity_date: Date | null | any;
  settle_date: Date | null;
  price_yield: number | null;
  par: number | null;
  dated: Date | null;
  first_coupon: Date | null;
  exclude_holidays: { label: string; value: string };
  coupons: string;

  // After Tax Calculation values
  after_tax_calcs: boolean;
  fed_tax_rate: number | null;
  state_tax_rate: number | null;
  state_of_issue: { label: string; value: string };
  state_of_residence: { label: string; value: string };

  // Floater values
  rate_reset_frequency: { label: string; value: string };
  using_fixing_curve: boolean;

  //TODO: for future use if security types is Mortgage values
  // last_date_factor: Date | null;
  // weghted_avg_maturity: number | null; // integer
  // factor: number | null; // float
  // pre_pay_modal: { label: string; value: string };
  // pre_pay_speed: number | null; // float

  // TODO: for future use if security types is Indexed values
  // index_ratio_settle: number | null; // float
  // inflation_rate: number | null; // float
  // maturity_adjusted: boolean;
}
