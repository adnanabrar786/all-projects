import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_ACCOUNT_COUNT_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { useRouter } from "next/router";
import { getClientAccountCount } from "services/accounts.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";

const useClientAccountCount = (clientId: string) => {
  const token = getToken();
  const router = useRouter();

  const {
    data: accountDetail,
    error,
  }: UseQueryResult<{ data: { data: number } }, CustomError> = useQuery({
    queryKey: [CLIENT_ACCOUNT_COUNT_KEY, clientId],
    queryFn: () => getClientAccountCount(clientId),
    enabled: token ? true : false,
  });

  handleErrorPage(error, router);

  return {
    accountCount: accountDetail?.data ? accountDetail?.data.data : null,
  };
};

export default useClientAccountCount;
