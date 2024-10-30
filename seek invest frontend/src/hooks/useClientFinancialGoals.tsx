import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_FINANCIAL_GOALS_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClientFinancialGoals } from "services/client.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useClientFinancialGoals = () => {
  const { clientId }: { clientId: string } = useParams();

  const token = getToken();
  const router = useRouter();

  const {
    data: clientFinancialGoals,
    refetch,
    isError,
    error,
  }: UseQueryResult<{ data: { data: any } }, CustomError> = useQuery({
    queryKey: [CLIENT_FINANCIAL_GOALS_KEY, clientId],
    queryFn: () => getClientFinancialGoals(clientId),
    enabled: token && clientId ? true : false,
    cacheTime: 0,
    retry: 0,
    refetchOnMount: true,
  });

  handleErrorPage(error, router);

  return {
    clientFinancialGoals: clientFinancialGoals?.data
      ? (clientFinancialGoals?.data.data as any)
      : null,
    refetch,
    isError,
  };
};

export default useClientFinancialGoals;
