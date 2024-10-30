import { SearchTradeResult } from '@/services/trade.services';
import { getToken } from '@/utils/token';
import { useQuery } from '@tanstack/react-query';

const useSearchTrade = (tradeName: string) => {
  const {
    data: searchList,
    error,
    isError,
    fetchStatus,
    isFetching,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ['search-trade'],
    queryFn: () => SearchTradeResult(tradeName),
    enabled: getToken() && tradeName != '' ? true : false,
    retry: 0,
  });

  return {
    searchList: searchList?.data?.data ? (searchList?.data?.data as []) : null,
    isFetched,
    isFetching,
    refetch,
  };
};

export default useSearchTrade;
