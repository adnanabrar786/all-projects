import { Wedding } from '@prisma/client';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { WeddingService } from 'services/wedding.service';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  weddingInfo: Wedding | null;
  isLoading: boolean;
  error: Error | null;
  isInit: boolean;
};

type Action = {
  fetchWedInfo: () => Promise<void>;
  clearWedInfo: () => void;
};

const weddingService = new WeddingService();
// TODO add isLoading functionality
const store: StateCreator<State & Action> = (set) => ({
  weddingInfo: null,
  isLoading: false,
  error: null,
  isInit: true,
  fetchWedInfo: async () => {
    try {
      set({ isLoading: true });

      const response = await weddingService.GetWedding();
      if (response) {
        set({ weddingInfo: response.data.data });
        set({ error: null });
      }
    } catch (error) {
      const err = error as Error;
      set({ error: err });
    } finally {
      set({ isInit: false });
      set({ isLoading: false });
    }
  },
  clearWedInfo: () => {
    set({ isInit: false });
    set({ weddingInfo: null });
  },
});

export const useStoreWedding = create(devtools(store));

export const useWedInfo = () => {
  const { weddingInfo, isLoading, fetchWedInfo, isInit, error } = useStoreWedding();
  const flagRef = useRef(true);

  useMemo(() => {
    const cond = !weddingInfo && !isLoading && flagRef.current && !error;

    if (cond) {
      flagRef.current = false;
      fetchWedInfo();
    }

    if (weddingInfo) {
      flagRef.current = true;
    }
  }, [weddingInfo]);

  return { weddingInfo, isInit, error, fetchWedInfo };
};
