import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_BY_ID_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IClient } from "interfaces/client";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { getClientById } from "services/client.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useClientByIdData = (clientIdParam?: string) => {
  const { clientId }: { clientId: string } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const token = getToken();

  const {
    data: client,
    refetch,
    error,
  }: UseQueryResult<{ data: { data: IClient } }, CustomError> = useQuery({
    queryKey: [CLIENT_BY_ID_KEY, clientId],
    queryFn: () => getClientById(clientIdParam || clientId),
    enabled: token && (clientId || clientIdParam) ? true : false,
    cacheTime: 0,
    refetchOnMount: true,
    retry: 0,
  });

  handleErrorPage(error, router);

  return {
    client: client?.data ? client?.data.data : null,
    refetch,
  };
};

export default useClientByIdData;
