import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_VALUES_PERSONA_OVERVIEW_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IValuesPersonaListData } from "interfaces/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClientValuesPersonaOverview } from "services/client.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useClientValuesPersonaOverviewData = (accountType: string) => {
  const { clientId, proposalId }: { clientId: string; proposalId: string } =
    useParams();
  const token = getToken();
  const router = useRouter();

  const {
    data: clientValuesPersona,
    isLoading,
    error,
  }: UseQueryResult<
    {
      data: {
        data: IValuesPersonaListData;
      };
    },
    CustomError
  > = useQuery({
    queryKey: [CLIENT_VALUES_PERSONA_OVERVIEW_KEY, clientId, proposalId],
    queryFn: () =>
      getClientValuesPersonaOverview(clientId, accountType, proposalId),
    enabled: token && clientId ? true : false,
    cacheTime: 0,
    refetchOnMount: true,
  });

  handleErrorPage(error, router);

  return {
    clientValuesPersona: clientValuesPersona?.data
      ? clientValuesPersona?.data.data.list
      : null,
    total_score:
      (clientValuesPersona?.data &&
        clientValuesPersona?.data.data.total_score) ??
      0,
    isLoading,
  };
};

export default useClientValuesPersonaOverviewData;
