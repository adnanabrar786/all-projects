import { SECURITY_TYPE_VALUES } from '@/constants/securities';

export const getSecurityTypeComponent = (value: string) => {
  switch (value) {
    case SECURITY_TYPE_VALUES.Mortgage:
      return SECURITY_TYPE_VALUES.Mortgage;
    case SECURITY_TYPE_VALUES.Indexed:
      return SECURITY_TYPE_VALUES.Indexed;
    case SECURITY_TYPE_VALUES.Floater:
      return SECURITY_TYPE_VALUES.Floater;
    case SECURITY_TYPE_VALUES.Discount:
      return SECURITY_TYPE_VALUES.Discount;
    default:
      return false;
  }
};
