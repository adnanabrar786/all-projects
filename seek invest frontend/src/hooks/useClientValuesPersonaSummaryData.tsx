import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_VALUES_PERSONA_SUMMARY_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { valueProfileSummary } from "services/assessment.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useClientValuesPersonaSummaryData = () => {
  const { clientId }: { clientId: string } = useParams();
  const token = getToken();
  const router = useRouter();

  const {
    data: clientValuesPersona,
    isError,
    error,
  }: UseQueryResult<{ data: { data: any } }, CustomError> = useQuery({
    queryKey: [CLIENT_VALUES_PERSONA_SUMMARY_KEY, clientId],
    queryFn: () => valueProfileSummary(clientId),
    enabled: token && clientId ? true : false,
    cacheTime: 0,
    refetchOnMount: true,
    retry: 0,
  });

  handleErrorPage(error, router);

  return {
    clientValuesPersona: clientValuesPersona?.data
      ? (clientValuesPersona?.data.data as any)
      : null,
    isValuePersonaError: isError,
  };
};

export default useClientValuesPersonaSummaryData;
