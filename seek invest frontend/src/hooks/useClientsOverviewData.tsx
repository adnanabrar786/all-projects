import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENTS_OVERVIEW_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IClientOverview } from "interfaces/client";
import { useRouter } from "next/router";
import { getClientsOverview } from "services/client.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useClientOverviewData = () => {
  const token = getToken();
  const router = useRouter();

  const {
    data: clientOverview,
    error,
  }: UseQueryResult<{ data: { data: IClientOverview } }, CustomError> =
    useQuery({
      queryKey: [CLIENTS_OVERVIEW_KEY],
      queryFn: () => getClientsOverview(),
      enabled: token ? true : false,
    });

  handleErrorPage(error, router);

  return {
    clientOverview: clientOverview?.data ? clientOverview?.data.data : null,
  };
};

export default useClientOverviewData;
