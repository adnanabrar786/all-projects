import axios, { AxiosRequestConfig } from 'axios';
import { API_STRIPE, API_WEDDING } from 'config/environment';
import { USER_ID_KEY } from 'constants/localStorage';
import { ICustomerPromotion } from 'interfaces/promotion.interface';

export default class StripeService {
  CreateCheckoutSession = async (userId: string, promotion_code: string | null) => {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${API_STRIPE}/checkout-session`,
      data: {
        data: {
          userId,
          promotion_code,
        },
      },
    };
    const response = await axios(config);
    return response;
  };

  GetPromotions = async () => {
    const userId = localStorage.getItem(USER_ID_KEY);
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${API_WEDDING}/promotion-codes`,
      data: {
        data: {
          id: userId,
        },
      },
    };
    const response = await axios<ICustomerPromotion>(config);
    return response;
  };
}
