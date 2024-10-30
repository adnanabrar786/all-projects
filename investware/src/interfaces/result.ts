export interface IResultData {
  label: string;
  value: string;
}

export interface GenerateCalculateTradeData {
  Description: string;
  AccruedInterest: number;
  CouponDays: number;
  Convexity: number;
  TBD: string;
  ModDurationSTD: number;
  FairPrice: number;
  MaturityYears: number;
  NetPayment: number;
  PriceToMaturity: number;
  PrincipalPayment: number;
  YieldToMaturity: number;
  YieldToWorst: number;
  LastInterestDate: string;
  NextInterestDate: string;
}
