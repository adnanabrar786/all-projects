import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_RISK_PERSONA_OVERVIEW_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IRiskPersona } from "interfaces/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClientRiskPersonaOverview } from "services/client.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useClientRiskPersonaOverviewData = () => {
  const { clientId }: { clientId: string } = useParams();
  const token = getToken();
  const router = useRouter();

  const {
    data: clientRiskPersona,
    isError,
    error,
  }: UseQueryResult<{ data: { data: IRiskPersona } }, CustomError> = useQuery({
    queryKey: [CLIENT_RISK_PERSONA_OVERVIEW_KEY, clientId],
    queryFn: () => getClientRiskPersonaOverview(clientId),
    enabled: token && clientId ? true : false,
    cacheTime: 0,
    refetchOnMount: true,
    retry: 0,
  });

  handleErrorPage(error, router);

  return {
    clientRiskPersona: clientRiskPersona?.data
      ? clientRiskPersona?.data.data
      : null,
    isRiskPersonaError: isError,
  };
};

export default useClientRiskPersonaOverviewData;
