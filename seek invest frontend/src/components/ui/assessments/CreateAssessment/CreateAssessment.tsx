import { Stack } from "@mui/material";
import AddQuestion from "components/ui/assessments/CreateAssessment/AddQuestion";
import Header from "components/ui/assessments/CreateAssessment/Header";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import useDefaultQuestionsData from "hooks/useDefaultQuestionsData";
import { useEffect } from "react";

const CreateAssessment = () => {
  const { defaultQuestions } = useDefaultQuestionsData();
  const { updateCustomQuestions, customQuestions } = useAssessmentContext();

  useEffect(() => {
    if (
      customQuestions.length === 0 &&
      defaultQuestions &&
      defaultQuestions.length > 0
    ) {
      updateCustomQuestions([
        //@ts-ignore
        { questionsType: "default", defaultQuestions: defaultQuestions },
      ]);
    }
  }, [defaultQuestions]);

  return (
    <Stack>
      <Header />

      <Stack
        sx={{
          paddingX: "0.63rem",
          gap: "1rem",
          paddingBottom: "5rem",
        }}
      >
        <AddQuestion />
      </Stack>
    </Stack>
  );
};

export default CreateAssessment;
