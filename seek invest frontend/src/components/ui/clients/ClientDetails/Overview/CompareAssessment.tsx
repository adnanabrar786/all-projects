import useClientAccountCount from "hooks/useClientAccountCount";
import { Stack } from "@mui/material";
import RiskProfile from "components/ui/clients/Proposals/ClientProposal/Profiles/RiskProfile";
import ValuesProfile from "components/ui/clients/Proposals/ClientProposal/Profiles/ValuesProfile";
import { EClientAccount, EProposalValues } from "enums/enums";
import { useParams } from "next/navigation";
import { useState } from "react";

const { ACCOUNT } = EClientAccount;

const CompareAssessment = () => {
  const { clientId }: { clientId: string } = useParams();
  const { accountCount } = useClientAccountCount(clientId);
  const [type, setType] = useState("");

  return (
    <>
      <Stack
        sx={{
          marginTop: "3.06rem",
        }}
      >
        <ValuesProfile
          profileType={EProposalValues.EMBRACE}
          accountType={ACCOUNT}
          accountCount={accountCount}
          setType={setType}
          type={type}
        />
        <RiskProfile />
      </Stack>
    </>
  );
};

export default CompareAssessment;
