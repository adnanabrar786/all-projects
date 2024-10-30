import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Skeleton, Stack } from "@mui/material";
import CustomAccordion from "components/common/Accordion/CustomAccordion";
import DefaultQuestion from "components/ui/assessments/CreateAssessment/DefaultQuestion";
import { BoxOutlinedIcon } from "constants/images.routes";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { IDefaultQuestion } from "interfaces/assessment";

const DefaultQuestions = () => {
  const { customQuestions } = useAssessmentContext();

  let defaultQuestions: IDefaultQuestion[] | null = [];

  const tempDefaultQuestions = customQuestions.find((tempDefaultQuestion) => {
    return tempDefaultQuestion.questionsType === "default";
  });

  if (tempDefaultQuestions) {
    defaultQuestions = tempDefaultQuestions.defaultQuestions;
  }

  return (
    <CustomAccordion
      icon={BoxOutlinedIcon}
      title="Expand Default Questions"
      desc="These questions can only be previewed and cannot be edited"
      sxIcon={{ backgroundColor: "var(--blue-light)" }}
      expandIcon={<ExpandMoreIcon />}
      showMenuIcon
    >
      <Stack sx={{}}>
        {defaultQuestions ? (
          defaultQuestions.map((defaultQuestion, index) => (
            <DefaultQuestion
              key={index}
              defaultQuestion={defaultQuestion}
              index={index}
            />
          ))
        ) : (
          <Skeleton />
        )}
      </Stack>
    </CustomAccordion>
  );
};

export default DefaultQuestions;
