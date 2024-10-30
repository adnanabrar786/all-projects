import { useCallback, useEffect, useRef } from 'react';
import { WeddingService } from 'services/wedding.service';
import { TEvent } from 'utils/types/timeline';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  WeddingTimelineInfo: TEvent[] | null;
  isLoading: boolean;
  error: Error | null;
  isInit: boolean;
};

type Action = {
  fetchWeddingTimelineInfo: () => Promise<void>;
  clearWeddingTimelineInfo: () => void;
};

const weddingService = new WeddingService();

const store: StateCreator<State & Action> = (set) => ({
  WeddingTimelineInfo: null,
  isLoading: false,
  error: null,
  isInit: true,
  fetchWeddingTimelineInfo: async () => {
    try {
      set({ isLoading: true });
      const { data: timelineData } = await weddingService.GetWeddingTimeline();
      if (timelineData) {
        set({ WeddingTimelineInfo: timelineData.data.timeline });
        set({ error: null });
      }
    } catch (error) {
      const err = error as Error;
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },
  clearWeddingTimelineInfo: () => {
    set({ isInit: false });
    set({ WeddingTimelineInfo: null });
  },
});

export const useStoreWeddingTimeline = create(devtools(store));

export const useWeddingTimeline = () => {
  const { WeddingTimelineInfo, isLoading, error, fetchWeddingTimelineInfo, isInit } = useStoreWeddingTimeline();
  const flagRef = useRef(true);

  const memoizedFetchUserInfo = useCallback(() => {
    if (!WeddingTimelineInfo && !isLoading && flagRef.current) {
      flagRef.current = false;
      fetchWeddingTimelineInfo();
    }

    if (WeddingTimelineInfo) {
      flagRef.current = true;
    }
  }, [WeddingTimelineInfo, isLoading, isInit, fetchWeddingTimelineInfo]);

  useEffect(() => {
    memoizedFetchUserInfo();
  }, [memoizedFetchUserInfo]);

  return { WeddingTimelineInfo, isLoading, error, isInit };
};
