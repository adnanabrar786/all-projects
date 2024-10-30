import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_ACCOUNTS_NAME_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IClientsAccounts } from "interfaces/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClientAccountsName } from "services/accounts.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";

const useClientAccountsNameData = () => {
  const { clientId } = useParams();
  const router = useRouter();

  const token = getToken();

  const {
    data: clientAccounts,
    isLoading,
    error,
  }: UseQueryResult<
    { data: { data: IClientsAccounts } },
    CustomError
  > = useQuery({
    queryKey: [CLIENT_ACCOUNTS_NAME_KEY, clientId],
    queryFn: () => getClientAccountsName(clientId as string),
    enabled: token && clientId ? true : false,
  });

  handleErrorPage(error, router);

  return {
    isLoading,
    clientAccounts: clientAccounts?.data ? clientAccounts?.data.data : null,
  };
};

export default useClientAccountsNameData;
