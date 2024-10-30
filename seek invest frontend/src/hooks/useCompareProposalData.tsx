import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { COMPARE_PROPOSAL_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { ICompareProposal } from "interfaces/proposal";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getCompareProposal } from "services/proposal.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useCompareProposalData = () => {
  const { proposalId }: { proposalId: string } = useParams();
  const token = getToken();
  const router = useRouter();

  const {
    data: compareProposal,
    error,
  }: UseQueryResult<{ data: { data: ICompareProposal } }, CustomError> =
    useQuery({
      queryKey: [COMPARE_PROPOSAL_KEY, proposalId],
      queryFn: () => getCompareProposal(proposalId),
      enabled: token && proposalId ? true : false,
      cacheTime: 0,
      refetchOnMount: true,
    });

  handleErrorPage(error, router);

  return {
    compareProposal: compareProposal?.data ? compareProposal?.data.data : null,
  };
};

export default useCompareProposalData;
