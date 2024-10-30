import { Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import CustomQuestionError from "components/common/CustomQuestionError";
import TextXs from "components/common/Text/TextXs";
import SingleSelectOption from "components/ui/assessments/CreateAssessment/CustomQuestionTypes/SingleSelectOption";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { IAssessmentQuestion } from "interfaces/assessment";
import { useMemo } from "react";

interface Props {
  index: number;
  customQuestion: IAssessmentQuestion;
}

const SingleSelectQuestion = ({ index, customQuestion }: Props) => {
  const { updateCustomQuestions, customQuestions } = useAssessmentContext();

  const handleAddOptions = () => {
    let tempCustomQuestions = [...customQuestions];
    tempCustomQuestions[index].options.push({ text: "" });
    updateCustomQuestions(tempCustomQuestions);
  };

  useMemo(() => {
    let tempCustomQuestions = [...customQuestions];
    const tempQuestionsOptions = tempCustomQuestions[index].options;
    if (!tempQuestionsOptions.length) {
      Array.from({ length: 2 }).map(() => {
        tempCustomQuestions[index].options.push({ text: "" });
      });

      updateCustomQuestions(tempCustomQuestions);
    }
  }, []);

  return (
    <>
      <CustomQuestionError
        error={
          (customQuestion.options.length < 2 && customQuestions[index].error) ||
          ""
        }
      />
      <Stack sx={{ marginTop: "1.5rem" }}>
        {customQuestion.options.length > 0 && (
          <TextXs text={"Options"} sx={{ fontWeight: "500" }} />
        )}
        {customQuestion.options.map((option, idx) => (
          <SingleSelectOption
            key={idx}
            index={index}
            optionIndex={idx}
            option={option.text}
            deletable={idx > 1}
          />
        ))}

        <Stack
          direction={"row"}
          sx={{ gap: "1rem", marginTop: "1.63rem", alignItems: "center" }}
        >
          <FilledButton
            secondary
            text="Add Option"
            onClick={() => handleAddOptions()}
          />

          <TextXs text={`or`} sx={{ fontWeight: "500" }} />

          <TextXs
            text={`Add “Others” with specify`}
            sx={{ fontWeight: "500" }}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default SingleSelectQuestion;
