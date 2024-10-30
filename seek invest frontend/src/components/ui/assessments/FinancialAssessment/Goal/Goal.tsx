import { Box, Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import Bonus from "components/ui/assessments/FinancialAssessment/Goal/Bonus";
import FinancialGoal from "components/ui/assessments/FinancialAssessment/Goal/FinancialGoal";
import Question from "components/ui/assessments/FinancialAssessment/Goal/Question";
import RelativeInheritance from "components/ui/assessments/FinancialAssessment/Goal/RelativeInheritance";
import FinancialLayout from "components/ui/layouts/FinancialLayout";
import { EFINANCIALLAYOUTTITLE } from "enums/enums";
import { useState } from "react";

const Goal = () => {
  const [currentComponent, setCurrentComponent] = useState<number>(1);

  const handlePrevious = () => {
    setCurrentComponent((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentComponent((prev) => Math.min(4, prev + 1));
  };

  return (
    <FinancialLayout title={EFINANCIALLAYOUTTITLE.RISK_TITLE} value={25}>
      <Stack
        sx={{
          maxWidth: "900px",
          paddingBottom: "80px",
        }}
      >
        {currentComponent === 1 && <FinancialGoal />}
        {currentComponent === 2 && <Question />}
        {currentComponent === 3 && <RelativeInheritance />}
        {currentComponent === 4 && <Bonus />}

        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            gap: "1.5rem",
          }}
        >
          <FilledButton
            onClick={handlePrevious}
            disabled={currentComponent === 1}
            secondary
            text="Previous step"
          />

          <FilledButton
            onClick={handleNext}
            disabled={currentComponent === 4}
            text="Proceed"
          />
        </Box>
      </Stack>
    </FinancialLayout>
  );
};

export default Goal;
