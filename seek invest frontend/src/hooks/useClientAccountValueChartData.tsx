import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_ACCOUNTS_VALUE_CHART_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IKeyAreas } from "interfaces/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClientAccountValuesChart } from "services/accounts.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";

const useClientAccountValueChartData = (
  accountId: string,
  isOpened: boolean
) => {
  const { clientId }: { clientId: string } = useParams();

  const token = getToken();
  const router = useRouter();

  const {
    data: valuesChart,
    refetch,
    isLoading,
    isError,
    error,
  }: UseQueryResult<{ data: { data: IKeyAreas[] } }, CustomError> = useQuery({
    queryKey: [CLIENT_ACCOUNTS_VALUE_CHART_KEY, accountId],
    queryFn: () => getClientAccountValuesChart(accountId),
    enabled: token && clientId && isOpened ? true : false,
    cacheTime: 0,
    retry: 0,
    refetchOnMount: true,
  });

  handleErrorPage(error, router);

  return {
    valuesChart: valuesChart?.data ? valuesChart?.data.data : null,
    refetch,
    isError,
    isLoading,
  };
};

export default useClientAccountValueChartData;
