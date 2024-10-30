import { Stack } from "@mui/material";
import ProposalDetails from "components/ui/clients/ClientDetails/Proposals/ProposalDetails";
import ClientDetailsLayout from "components/ui/layouts/ClientDetailsLayout";
import { LoadingDarkIcon } from "constants/images.routes";
import { CLIENT_DETAIL_PROPOSALS } from "constants/pages.routes";
import { ENEW } from "enums/enums";
import useClientProposalsData from "hooks/useClientProposalsData";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
const { NEW } = ENEW;

const Proposal = () => {
  const { clientId, proposalId }: { clientId: string; proposalId: string } =
    useParams();
  const router = useRouter();
  const { clientProposals } = useClientProposalsData(clientId);

  useEffect(() => {
    if (
      proposalId === NEW &&
      clientProposals &&
      !clientProposals.assessment_completed
    ) {
      router.replace(CLIENT_DETAIL_PROPOSALS({ clientId }));
    }
  }, [clientProposals]);

  return (
    <ClientDetailsLayout>
      {clientProposals && clientProposals.assessment_completed ? (
        <ProposalDetails />
      ) : (
        <Stack
          sx={{
            height: "50vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            className={"rotating"}
            priority
            src={LoadingDarkIcon}
            alt={"icon"}
            width={80}
            height={80}
          />
        </Stack>
      )}
    </ClientDetailsLayout>
  );
};

export default Proposal;
