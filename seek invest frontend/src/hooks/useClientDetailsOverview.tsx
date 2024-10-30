import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_DETAILS_OVERVIEW_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IClientDetailsOverview } from "interfaces/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClientDetailsOverview } from "services/client.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useClientDetailsOverview = () => {
  const { clientId }: { clientId: string } = useParams();

  const token = getToken();
  const router = useRouter();

  const {
    data: clientDetailsOverview,
    refetch,
    error,
  }: UseQueryResult<
    { data: { data: IClientDetailsOverview } },
    CustomError
  > = useQuery({
    queryKey: [CLIENT_DETAILS_OVERVIEW_KEY, clientId],
    queryFn: () => getClientDetailsOverview(clientId),
    enabled: token && clientId ? true : false,
    cacheTime: 0,
    refetchOnMount: true,
  });

  handleErrorPage(error, router);

  return {
    clientDetailsOverview: clientDetailsOverview?.data
      ? clientDetailsOverview?.data.data
      : null,
    refetch,
  };
};

export default useClientDetailsOverview;
