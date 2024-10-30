import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_ACCOUNTS_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IClientsAccountData } from "interfaces/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClientAccounts } from "services/accounts.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";

const useClientAccountsData = () => {
  const { clientId } = useParams();
  const router = useRouter();

  const token = getToken();

  const {
    data: clientAccounts,
    isLoading,
    error,
  }: UseQueryResult<
    { data: { data: IClientsAccountData } },
    CustomError
  > = useQuery({
    queryKey: [CLIENT_ACCOUNTS_KEY, clientId],
    queryFn: () => getClientAccounts(clientId as string),
    enabled: token && clientId ? true : false,
  });

  handleErrorPage(error, router);

  return {
    isLoading,
    clientAccounts: clientAccounts?.data ? clientAccounts?.data.data : null,
  };
};

export default useClientAccountsData;
