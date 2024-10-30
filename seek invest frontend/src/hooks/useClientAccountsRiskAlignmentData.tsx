import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_ACCOUNTS_RISK_ALIGNMENT_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IClientAccountsRiskAlignmentSummary } from "interfaces/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getClientAccountsRiskAlignment } from "services/accounts.services";
import { handleErrorPage } from "utils/error";
import { toastError } from "utils/toaster";
import { getToken } from "utils/token";

const useClientAccountsRiskAlignmentData = (
  refresh = false,
  setIsRefreshing
) => {
  const { clientId }: { clientId: string } = useParams();
  const router = useRouter();
  const token = getToken();

  const {
    data: accountsRiskAlignment,
    refetch,
    isError,
    error,
  }: UseQueryResult<
    {
      data: {
        data: IClientAccountsRiskAlignmentSummary;
        message: string;
        error: string;
      };
    },
    CustomError
  > = useQuery({
    queryKey: [CLIENT_ACCOUNTS_RISK_ALIGNMENT_KEY, refresh, clientId],
    queryFn: async () => {
      const data = await getClientAccountsRiskAlignment(clientId, refresh);
      setIsRefreshing(false);
      return data;
    },
    enabled: token && clientId ? true : false,
  });

  useEffect(() => {
    if (accountsRiskAlignment?.data && accountsRiskAlignment?.data?.error) {
      toastError(accountsRiskAlignment?.data?.message);
    }
  }, [accountsRiskAlignment]);

  handleErrorPage(error, router);

  return {
    accountsRiskAlignment: accountsRiskAlignment?.data
      ? accountsRiskAlignment?.data.data
      : null,
    refetch,
    isError,
  };
};

export default useClientAccountsRiskAlignmentData;
