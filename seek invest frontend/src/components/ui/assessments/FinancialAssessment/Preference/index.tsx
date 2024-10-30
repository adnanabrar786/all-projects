import { Stack, Typography } from "@mui/material";
import Details from "components/ui/assessments/FinancialAssessment/Preference/Details";

import PreferenceModal from "components/ui/assessments/FinancialAssessment/Preference/PreferenceModal/PreferenceModal";
import { useAssessmentContext } from "context/assessment/AssessmentContext";

const Preference = () => {
  const {
    selectedPreferenceValues,
    setSelectedPreferenceValues,
    selectedTopics,
    setSelectedTopics,
  } = useAssessmentContext();

  return (
    <Stack>
      <Typography
        sx={{
          color: "var(--text-primary)",
          fontSize: "3rem",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "3.75rem",
          letterSpacing: "-0.06rem",
          span: {
            color: "var(--primary)",
            marginLeft: "0.5rem",
          },
        }}
      >
        Indicate your
        <span>preference</span> and
        <span>importance</span> for your topics
      </Typography>

      <Details />

      <PreferenceModal />
    </Stack>
  );
};

export default Preference;
