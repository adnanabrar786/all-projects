import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_PROPOSALS_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IClientProposal } from "interfaces/proposal";
import { useRouter } from "next/router";
import { getClientProposals } from "services/proposal.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useClientProposalsData = (clientId: string, isFetched = true) => {
  const token = getToken();
  const router = useRouter();

  const {
    data: clientProposals,
    error,
  }: UseQueryResult<{ data: { data: IClientProposal } }, CustomError> =
    useQuery({
      queryKey: [CLIENT_PROPOSALS_KEY, clientId],
      queryFn: () => getClientProposals(clientId),
      enabled: token && isFetched ? true : false,
    });

  handleErrorPage(error, router);

  return {
    clientProposals: clientProposals?.data ? clientProposals?.data.data : null,
  };
};

export default useClientProposalsData;
