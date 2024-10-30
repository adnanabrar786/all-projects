import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CLIENT_PROPOSAL_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IClientProposalDetails } from "interfaces/proposal";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClientProposal } from "services/proposal.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useClientProposalData = (isFetched) => {
  const token = getToken();
  const router = useRouter();
  const { proposalId }: { proposalId: string } = useParams();

  const {
    data: clientProposal,
    error,
  }: UseQueryResult<{ data: { data: IClientProposalDetails } }, CustomError> =
    useQuery({
      queryKey: [CLIENT_PROPOSAL_KEY, proposalId],
      queryFn: () => getClientProposal(proposalId),
      enabled: token && isFetched ? true : false,
    });

  handleErrorPage(error, router);

  return {
    clientProposal: clientProposal?.data ? clientProposal?.data.data : null,
  };
};

export default useClientProposalData;
