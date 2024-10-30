import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ACCOUNT_VALUE_ALIGNMENTS_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IAccountValuesAlignment } from "interfaces/client";
import { useParams, useRouter } from "next/navigation";
import { accountValueAlignments } from "services/accounts.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";

const useAccountValueAlignmentsData = (isLoaded: boolean) => {
  const { clientId }: { clientId: string } = useParams();
  const token = getToken();

  const {
    data: accountsValueAlignment,
    error,
    isError,
    refetch,
  }: UseQueryResult<
    { data: { data: IAccountValuesAlignment } },
    CustomError
  > = useQuery({
    queryKey: [ACCOUNT_VALUE_ALIGNMENTS_KEY, clientId],
    queryFn: () => accountValueAlignments(clientId),
    enabled: token && isLoaded ? true : false,
  });
  const router = useRouter();

  handleErrorPage(error, router);

  return {
    accountsValueAlignment: accountsValueAlignment?.data
      ? accountsValueAlignment?.data.data
      : null,
    refetch,
    isError,
  };
};

export default useAccountValueAlignmentsData;
