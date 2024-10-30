import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_LIST_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IClient, IMetaData } from "interfaces/client";
import { useRouter } from "next/router";
import { getClientsList } from "services/client.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useClientsListData = (
  page: number = 1,
  search: string = "",
  filters: string,
  sortBy?: string,
  sortByKey?: string
) => {
  const token = getToken();
  const router = useRouter();

  const {
    data: clientsList,
    isFetched,
    error,
  }: UseQueryResult<
    { data: { data: IClient[]; meta: IMetaData } },
    CustomError
  > = useQuery({
    queryKey: [CLIENT_LIST_KEY, search, page, filters, sortBy, sortByKey],
    queryFn: () =>
      getClientsList({
        name: search,
        page,
        filters,
        sortBy,
        sortByKey,
      }),
    enabled: token ? true : false,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
  });

  handleErrorPage(error, router);

  return {
    clientsList: clientsList?.data
      ? (clientsList?.data.data as IClient[])
      : null,
    metaData: clientsList?.data ? (clientsList?.data.meta as IMetaData) : null,
    isFetched,
  };
};

export default useClientsListData;
