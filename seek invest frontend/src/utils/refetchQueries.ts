import { QueryClient } from "@tanstack/react-query";
import {
  ACCOUNT_VALUE_ALIGNMENTS_KEY,
  CLIENT_ACCOUNT_VALUES_FILTER_KEY,
  CLIENT_ACCOUNTS_KEY,
  CLIENT_ACCOUNTS_VALUE_CHART_KEY,
  TOTAL_ACCOUNT_VALUE_KEY,
} from "constants/react_query_keys";

export const refetchAccountsQueries = (
  queryClient: QueryClient,
  clientId: string
) => {
  queryClient.invalidateQueries([CLIENT_ACCOUNTS_KEY, clientId]);
  queryClient.invalidateQueries([CLIENT_ACCOUNT_VALUES_FILTER_KEY]);
  queryClient.invalidateQueries([ACCOUNT_VALUE_ALIGNMENTS_KEY]);
  queryClient.invalidateQueries([TOTAL_ACCOUNT_VALUE_KEY]);
  queryClient.invalidateQueries([CLIENT_ACCOUNTS_VALUE_CHART_KEY]);
};
