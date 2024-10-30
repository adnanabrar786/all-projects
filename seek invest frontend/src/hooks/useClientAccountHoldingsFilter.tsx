import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_ACCOUNT_VALUES_FILTER_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClientAccountHoldingsFilter } from "services/accounts.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";

const useClientAccountHoldingsFilter = (
  accountId: string,
  topicName: string
) => {
  const { clientId }: { clientId: string } = useParams();

  const token = getToken();
  const router = useRouter();

  const {
    data: valuesFilter,
    refetch,
    isLoading,
    isInitialLoading,
    isError,
    error,
  }: UseQueryResult<{ data: { data: any } }, CustomError> = useQuery({
    queryKey: [CLIENT_ACCOUNT_VALUES_FILTER_KEY, accountId, topicName],
    queryFn: () => getClientAccountHoldingsFilter(accountId, topicName),
    enabled: token && clientId && topicName ? true : false,
    cacheTime: 0,
    retry: 0,
  });

  handleErrorPage(error, router);
  return {
    valuesFilter: valuesFilter?.data
      ? (valuesFilter?.data?.data?.holdings as any)
      : null,
    showValuesAlignment: valuesFilter?.data
      ? (valuesFilter?.data?.data?.showValuesAlignment as boolean)
      : true,
    refetch,
    isError,
    isLoading: isInitialLoading,
  };
};

export default useClientAccountHoldingsFilter;
