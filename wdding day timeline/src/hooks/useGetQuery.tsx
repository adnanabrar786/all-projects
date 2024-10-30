import { useCallback } from 'react';
import UserService from 'services/user.service';
import { useQuery } from '@tanstack/react-query';
import GuestService from 'services/guest.service';
import ImageService from 'services/image.service';
import StripeService from 'services/stripe.service';
import SunsetService from 'services/sunset.service';
import CouplesService from 'services/couples.service';
import { IUseQueryConfig } from 'interfaces/reactQuery';
import VendorService from 'services/vendortype.service';
import { WeddingService } from 'services/wedding.service';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';

type KeyObj = {
  key?: string;
  params?: unknown;
};
export default function useGetQuery(keys: KeyObj, config: IUseQueryConfig) {
  const queryFn = useCallback(() => callServiceByKey(keys), [keys]);

  return useQuery([keys.key, keys.params], queryFn, {
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess: config.onSuccess,
    onError: config.onError,
  });
}

const callServiceByKey = (key: KeyObj) => {
  switch (key.key) {
    case REACT_QUERY_KEYS.WEDDING_DETAILS: {
      const weddingService = new WeddingService();
      return weddingService.GetWedding();
    }
    case REACT_QUERY_KEYS.COUPLE: {
      const couplesService = new CouplesService();
      return couplesService.GetCouple();
    }
    case REACT_QUERY_KEYS.GET_TIMELINE: {
      const weddingService = new WeddingService();
      return weddingService.GetWeddingTimeline();
    }
    case REACT_QUERY_KEYS.GET_TIMELINE_EVENT: {
      const weddingService = new WeddingService();
      return weddingService.GetWeddingTimelineEvents();
    }
    case REACT_QUERY_KEYS.WEDDING_COVER: {
      const imageService = new ImageService();
      return imageService.GetWeddingCover();
    }
    case REACT_QUERY_KEYS.DETAIL_USER: {
      const userService = new UserService();
      return userService.GetUserDetail();
    }
    case REACT_QUERY_KEYS.SUNSET_TIME: {
      const sunsetService = new SunsetService();
      return sunsetService.GetSunsetTime();
    }
    case REACT_QUERY_KEYS.PROMOTION_CODES: {
      const stripeService = new StripeService();
      return stripeService.GetPromotions();
    }
    case REACT_QUERY_KEYS.WEDDING_LOCATION: {
      const weddingService = new WeddingService();
      return weddingService.GetWeddingLocations();
    }
    case REACT_QUERY_KEYS.GUEST: {
      const guestService = new GuestService();
      return guestService.GetGuests();
    }
    case REACT_QUERY_KEYS.VENDOR: {
      const vendorService = new VendorService();
      return vendorService.GetVendors();
    }
    case REACT_QUERY_KEYS.WEBLINK_DATA: {
      const weddingService = new WeddingService();
      return weddingService.GetWebLinkData(key.params as string);
    }
    default: {
      if (key.key) {
        throw new Error(`Invalid key ${key.key} provided to useGetQuery`);
      }

      return null;
      // throw new Error(`Empty Key provided to useGetQuery`);
    }
  }
};
