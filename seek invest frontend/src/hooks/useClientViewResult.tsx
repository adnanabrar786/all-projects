import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_VIEW_RESULT_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClientViewResult } from "services/client.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useClientViewResult = (fhaId: string) => {
  const { clientId }: { clientId: string } = useParams();

  const token = getToken();
  const router = useRouter();

  const {
    data: viewResult,
    refetch,
    isLoading,
    isError,
    error,
  }: UseQueryResult<{ data: { data: any } }, CustomError> = useQuery({
    queryKey: [CLIENT_VIEW_RESULT_KEY, clientId, fhaId],
    queryFn: () => getClientViewResult(clientId, fhaId),
    enabled: token && clientId && fhaId ? true : false,
    cacheTime: 0,
    retry: 0,
    refetchOnMount: true,
  });

  handleErrorPage(error, router);

  return {
    viewResult: viewResult?.data ? (viewResult?.data.data as any) : null,
    refetch,
    isError,
    isLoading,
  };
};

export default useClientViewResult;
