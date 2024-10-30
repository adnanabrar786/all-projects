import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { HOLDING_REPORT_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IHoldingReport } from "interfaces/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getHoldingReport } from "services/accounts.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useHoldingReportData = (accountId: string, holdingId: string) => {
  const { clientId }: { clientId: string } = useParams();

  const token = getToken();
  const router = useRouter();

  const {
    data: holdingReport,
    refetch,
    isLoading,
    isError,
    error,
  }: UseQueryResult<{ data: { data: IHoldingReport } }, CustomError> = useQuery(
    {
      queryKey: [HOLDING_REPORT_KEY],
      queryFn: () => getHoldingReport(accountId, holdingId),
      enabled: token && clientId && accountId && holdingId ? true : false,
      cacheTime: 0,
      retry: 0,
      refetchOnMount: true,
    }
  );

  handleErrorPage(error, router);

  return {
    holdingReport: holdingReport?.data
      ? (holdingReport?.data.data as IHoldingReport)
      : null,
    refetch,
    error: error as any,
    isLoading,
  };
};

export default useHoldingReportData;
