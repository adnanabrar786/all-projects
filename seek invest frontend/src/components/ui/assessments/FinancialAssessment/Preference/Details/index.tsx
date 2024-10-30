import { Grid, Stack } from "@mui/material";
import TextSm from "components/common/Text/TextSm";
import FinancialPreference from "components/ui/assessments/FinancialAssessment/Preference/Details/FinancialPreference";
import { financialPreferenceList } from "constants/data";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { useEffect } from "react";

const Details = () => {
  const {
    selectedPreferenceValues,
    setSelectedPreferenceValues,
    selectedTopics,
  } = useAssessmentContext();

  useEffect(() => {
    if (selectedPreferenceValues.length === 0) {
      let tempSelectedPreferenceValues = [...selectedPreferenceValues];
      financialPreferenceList.forEach(() => {
        tempSelectedPreferenceValues.push({ preference: "", value: 0 });
      });
      setSelectedPreferenceValues(tempSelectedPreferenceValues);
    }
  }, []);

  return (
    <>
      <Grid
        container
        spacing={6}
        sx={{
          marginTop: "0rem",
        }}
      >
        {[
          "Selected topics",
          "Select your preference",
          "Select your importance",
        ].map((text, index) => (
          <Grid key={index} item xs={4}>
            <TextSm
              sx={{
                fontWeight: "600",
              }}
              text={text}
            />
          </Grid>
        ))}
      </Grid>

      <Stack sx={{ gap: "2.25rem", marginTop: "3rem" }}>
        {selectedTopics.map((topic, index) => (
          <FinancialPreference key={index} topic={topic} index={index} />
        ))}
      </Stack>
    </>
  );
};

export default Details;
