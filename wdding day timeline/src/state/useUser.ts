import { SubscriptionType, USER_VERSIONS, Users } from '@prisma/client';
import { USER_ID_KEY, USER_SUBSCRIPTION_TYPE_KEY, USER_VERSION_KEY } from 'constants/localStorage';
import LogRocket from 'logrocket';
import { useCallback, useEffect, useRef } from 'react';
import { RESET_TIMELINE_URL, SALE_URL } from 'routes';
import UserService from 'services/user.service';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  isInit: boolean;
  isLoading: boolean;
  error: Error | null;
  userInfo: Users | null;
};

type Action = {
  fetchUserInfo: () => Promise<void>;
  clearUserInfo: () => void;
};

const userService = new UserService();

const store: StateCreator<State & Action> = (set) => ({
  userInfo: null,
  isLoading: false,
  isInit: true,
  error: null,
  fetchUserInfo: async () => {
    try {
      set({ isLoading: true });
      const response = await userService.GetUserDetail();
      if (response?.data) {
        const user = response.data.data;
        const version = user.version;
        const subscrpition_type = user.subscrpition_type;
        const id = user.id;
        const Subscription_check_list = [
          SubscriptionType.TRIAL,
          SubscriptionType.PRO_YEARLY,
          SubscriptionType.PRO_MONTHLY,
        ];
        localStorage.setItem(USER_ID_KEY, user.id);
        localStorage.setItem(USER_SUBSCRIPTION_TYPE_KEY, user.subscrpition_type);
        localStorage.setItem(USER_VERSION_KEY, user.version);

        LogRocket.identify(user.id, {
          name: user.first_name,
          email: user.email,
          subscriptionType: 'pro',
        });

        if (
          version === USER_VERSIONS.V2 &&
          [...Subscription_check_list, SubscriptionType.FREEMIUM].includes(subscrpition_type)
        ) {
          // localStorage.clear();
          localStorage.setItem(USER_ID_KEY, id);
          // Auth.signOut()
          window.location.href = SALE_URL;
          return;
        }
        if (
          version === USER_VERSIONS.V2 &&
          [...Subscription_check_list, SubscriptionType.PREMIUM].includes(subscrpition_type)
        ) {
          window.location.href = RESET_TIMELINE_URL;
        }
        set({ userInfo: response.data.data });
        set({ error: null });
      }
    } catch (error) {
      const err = error as Error;
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },
  clearUserInfo: () => {
    set({ isInit: false });
    set({ userInfo: null });
  },
});

export const useStore = create(devtools(store));

export const useUserInfo = () => {
  const { userInfo, isLoading, error, fetchUserInfo, isInit } = useStore();
  const flagRef = useRef(true);
  let isPremium = // This user is in trial
    userInfo &&
    (userInfo.subscrpition_type === SubscriptionType.PREMIUM ||
      userInfo.subscrpition_type === SubscriptionType.PRO_MONTHLY ||
      userInfo.subscrpition_type === SubscriptionType.PRO_YEARLY ||
      userInfo.subscrpition_type === SubscriptionType.TRIAL);
  let isSubscribed = // This user made payment
    userInfo &&
    (userInfo.subscrpition_type === SubscriptionType.PREMIUM ||
      userInfo.subscrpition_type === SubscriptionType.PRO_MONTHLY ||
      userInfo.subscrpition_type === SubscriptionType.PRO_YEARLY);

  const memoizedFetchUserInfo = useCallback(() => {
    if (!userInfo && !isLoading && flagRef.current) {
      flagRef.current = false;
      fetchUserInfo();
    }

    if (userInfo) {
      flagRef.current = true;
    }

    isPremium =
      userInfo &&
      (userInfo.subscrpition_type === SubscriptionType.PREMIUM ||
        userInfo.subscrpition_type === SubscriptionType.PRO_MONTHLY ||
        userInfo.subscrpition_type === SubscriptionType.PRO_YEARLY ||
        userInfo.subscrpition_type === SubscriptionType.TRIAL);

    isSubscribed =
      userInfo &&
      (userInfo.subscrpition_type === SubscriptionType.PREMIUM ||
        userInfo.subscrpition_type === SubscriptionType.PRO_MONTHLY ||
        userInfo.subscrpition_type === SubscriptionType.PRO_YEARLY);
  }, [userInfo, isLoading, isInit, isPremium, fetchUserInfo, isSubscribed]);

  useEffect(() => {
    memoizedFetchUserInfo();
  }, [memoizedFetchUserInfo]);

  return { userInfo, isPremium, isLoading, isInit, error, isSubscribed };
};
