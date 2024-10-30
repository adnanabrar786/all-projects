import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_ASSESSMENTS_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClientAssessments } from "services/client.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";

const useClientAssessmentData = () => {
  const { clientId }: { clientId: string } = useParams();

  const token = getToken();
  const router = useRouter();

  const {
    data: assessments,
    refetch,
    isError,
    error,
  }: UseQueryResult<{ data: { data: any } }, CustomError> = useQuery({
    queryKey: [CLIENT_ASSESSMENTS_KEY, clientId],
    queryFn: () => getClientAssessments(clientId),
    enabled: token && clientId ? true : false,
    cacheTime: 0,
    retry: 0,
    refetchOnMount: true,
  });

  handleErrorPage(error, router);

  return {
    assessments: assessments?.data ? (assessments?.data.data as any) : null,
    refetch,
    isError,
  };
};

export default useClientAssessmentData;
