import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TOTAL_ACCOUNT_VALUE_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { ITotalAccountValue } from "interfaces/client";
import { useParams, useRouter } from "next/navigation";
import { totalAccountsValue } from "services/accounts.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useTotalAccountsValueData = () => {
  const { clientId }: { clientId: string } = useParams();
  const token = getToken();

  const {
    data: totalAccValue,
    error,
    isError,
    refetch,
  }: UseQueryResult<
    { data: { data: ITotalAccountValue } },
    CustomError
  > = useQuery({
    queryKey: [TOTAL_ACCOUNT_VALUE_KEY, clientId],
    queryFn: () => totalAccountsValue(clientId),
    enabled: token ? true : false,
  });
  const router = useRouter();

  handleErrorPage(error, router);

  return {
    totalAccValue: totalAccValue?.data ? totalAccValue?.data.data : null,
    refetch,
    isError,
  };
};

export default useTotalAccountsValueData;
