import Header from "components/ui/clients/ClientDetails/Proposals/Header";
import ProposalTable from "components/ui/clients/ClientDetails/Proposals/ProposalTable";
import useClientProposalsData from "hooks/useClientProposalsData";
import { useParams } from "next/navigation";

const Proposals = () => {
  const { clientId }: { clientId: string } = useParams();
  const { clientProposals } = useClientProposalsData(clientId);
  return (
    <>
      <Header clientProposals={clientProposals} />
      <ProposalTable clientProposals={clientProposals} />
    </>
  );
};

export default Proposals;
