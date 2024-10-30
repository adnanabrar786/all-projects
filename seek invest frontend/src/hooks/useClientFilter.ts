import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_FILTER_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IClientFilter } from "interfaces/client";
import { useRouter } from "next/router";
import { getClientFilter } from "services/client.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
export const useClientFilter = () => {
  const token = getToken();
  const router = useRouter();

  const {
    data: clientFilterData,
    error,
  }: UseQueryResult<{ data: { data: IClientFilter[] } }, CustomError> =
    useQuery({
      queryKey: [CLIENT_FILTER_KEY],
      queryFn: () => getClientFilter(),
      enabled: token ? true : false,
    });

  handleErrorPage(error, router);

  return {
    clientFilterData: clientFilterData?.data
      ? clientFilterData?.data.data
      : null,
  };
};
