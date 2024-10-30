import { Stack } from "@mui/material";
import Bio from "components/ui/clients/ClientDetails/Overview/Bio";
import CompareAssessment from "components/ui/clients/ClientDetails/Overview/CompareAssessment";
import ClientDefaultAndCustomQuestions from "components/ui/clients/ClientDetails/Overview/FinancialGoals";
import ClientDetailsLayout from "components/ui/layouts/ClientDetailsLayout";

const Overview = () => {
  return (
    <ClientDetailsLayout>
      <Stack direction={"row"} sx={{ gap: "0.5rem" }}>
        <Bio />

        <ClientDefaultAndCustomQuestions />
      </Stack>

      <CompareAssessment />
    </ClientDetailsLayout>
  );
};

export default Overview;
