import { Stack } from "@mui/material";
import TextXl from "components/common/Text/TextXl";
import RiskTopCard from "components/ui/assessments/FinancialAssessment/Goal/RiskOverview/RiskTopCard";
import { IComplianceResult } from "interfaces/assessment";

interface Props {
  complianceResult: IComplianceResult;
}

const RiskOverview = ({ complianceResult }: Props) => {
  return (
    <Stack
      sx={{
        padding: "0rem 2rem",
        margin: "0.94rem",
        height: "100vh",
      }}
    >
      <TextXl
        sx={{
          color: "var(--text-primary)",
          fontSize: "3rem",
          fontWeight: "400",
          fontStyle: "normal",
          lineHeight: "3.75rem",
          letterSpacing: "-0.06rem",
        }}
        text="Your Risk Overview"
      />

      <RiskTopCard complianceResult={complianceResult} />

      {/* /TODO: Delete this */}
      {/* <RiskCard complianceResult={complianceResult} /> */}
    </Stack>
  );
};

export default RiskOverview;
