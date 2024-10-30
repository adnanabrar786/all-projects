import { useCallback, useEffect, useRef } from 'react';
import CouplesService from 'services/couples.service';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  coupleInfo: any | null;
  isLoading: boolean;
  isInit: boolean;
  error: Error | null;
};

type Action = {
  fetchCoupleInfo: () => Promise<void>;
  clearCoupleInfo: () => void;
};

const coupleService = new CouplesService();

const store: StateCreator<State & Action> = (set) => ({
  coupleInfo: null,
  isLoading: false,
  isInit: true,
  error: null,
  fetchCoupleInfo: async () => {
    try {
      set({ isLoading: true });
      const response = await coupleService.GetCouple();
      if (response.data && response.data?.data) {
        set({ error: null });
        set({ coupleInfo: response.data?.data });
      }
    } catch (error) {
      const err = error as Error;
      set({ error: err });
    } finally {
      set({ isInit: false });
      set({ isLoading: false });
    }
  },
  clearCoupleInfo: () => {
    set({ coupleInfo: null });
  },
});

export const useStoreCouple = create(devtools(store));

export const useCoupleInfo = () => {
  const { coupleInfo, isLoading, isInit, error, fetchCoupleInfo } = useStoreCouple();
  const flagRef = useRef(true);

  const memoizedFetchUserInfo = useCallback(() => {
    if (!coupleInfo && !isLoading && flagRef.current) {
      flagRef.current = false;
      fetchCoupleInfo();
    }

    if (coupleInfo) {
      flagRef.current = true;
    }
  }, [coupleInfo, isLoading, isInit, fetchCoupleInfo]);

  useEffect(() => {
    memoizedFetchUserInfo();
  }, [memoizedFetchUserInfo]);

  return { coupleInfo, isLoading, isInit, error };
};
