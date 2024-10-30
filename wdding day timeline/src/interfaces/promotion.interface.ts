export type ICustomerPromotion = {
  id: string;
  object: string;
  active: boolean;
  code: '50OFF' | '33OFF';
  coupon: {
    id: string;
    object: string;
    amount_off: null | number;
    created: number;
    currency: null;
    duration: string;
    duration_in_months: null;
    livemode: boolean;
    max_redemptions: null;
    metadata: object;
    name: '50OFF' | '33OFF';
    percent_off: 50 | 33;
    redeem_by: number;
    times_redeemed: number;
    valid: true;
  };
  created: 1715503344;
  customer: string;
  expires_at: number;
  livemode: boolean;
  max_redemptions: number;
  metadata: object;
  restrictions: {
    first_time_transaction: boolean;
    minimum_amount: null;
    minimum_amount_currency: null;
  };
  times_redeemed: number;
};
