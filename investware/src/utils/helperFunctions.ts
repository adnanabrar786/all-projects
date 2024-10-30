import { GenerateCalculateTradeData } from '@/interfaces/result';

export const handleTogglePassword = (setShowPassword: (showPassword: boolean) => void, showPassword: boolean) => {
  setShowPassword(!showPassword);
};

export function generateCalculateTradeData(givenData: GenerateCalculateTradeData) {
  return {
    Description: givenData.Description,
    Accrued: givenData.AccruedInterest,
    'Accrued days': givenData.CouponDays,
    Convexity: givenData.Convexity,
    Country: givenData.TBD,
    Currency: givenData.TBD,
    Duration: givenData.ModDurationSTD,
    'Fair Value': givenData.FairPrice,
    'Maturity Length': givenData.MaturityYears,
    'Net Payment': givenData.NetPayment,
    Price: givenData.PriceToMaturity,
    Principal: givenData.PrincipalPayment,
    'Yield to Maturity': givenData.YieldToMaturity,
    'Yield to Worst': givenData.YieldToWorst,
    'Last Payment': givenData.LastInterestDate,
    'Next Payment': givenData.NextInterestDate,
  };
}
