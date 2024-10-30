import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_SUMMARY_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IClientSummary } from "interfaces/client";
import { useRouter } from "next/router";
import { getClientSummary } from "services/client.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useClientSummaryData = (clientId: string) => {
  const token = getToken();
  const router = useRouter();

  const {
    data: clientSummary,
    error,
  }: UseQueryResult<{ data: { data: IClientSummary } }, CustomError> = useQuery(
    {
      queryKey: [`${CLIENT_SUMMARY_KEY}${clientId}`],
      queryFn: () => getClientSummary(clientId),
      enabled: token && clientId ? true : false,
    }
  );

  handleErrorPage(error, router);

  return {
    clientSummary: clientSummary?.data ? clientSummary?.data.data : null,
  };
};

export default useClientSummaryData;
