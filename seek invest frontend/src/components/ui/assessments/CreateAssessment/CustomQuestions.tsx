import { Box, ClickAwayListener, Stack } from "@mui/material";
import CustomAccordion from "components/common/Accordion/CustomAccordion";
import ListButton from "components/common/Button/ListButton";
import MenuCard from "components/common/Card/MenuCard";
import CustomQuestionError from "components/common/CustomQuestionError";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import MUISwitch from "components/common/Switch/MUISwitch";
import TextXs from "components/common/Text/TextXs";
import OpenTextQuestion from "components/ui/assessments/CreateAssessment/CustomQuestionTypes/OpenTextQuestion";
import RatingScaleQuestion from "components/ui/assessments/CreateAssessment/CustomQuestionTypes/RatingScaleQuestion";
import SingleSelectQuestion from "components/ui/assessments/CreateAssessment/CustomQuestionTypes/SingleSelectQuestion";
import YesNoQuestion from "components/ui/assessments/CreateAssessment/CustomQuestionTypes/YesNoQuestion";
import { DeleteIcon, DotsHorizontalIcon } from "constants/images.routes";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { EQuestionType } from "enums/assessment";
import { IAssessmentQuestion } from "interfaces/assessment";
import Image from "next/image";
import { useState } from "react";

const { MULTI_CHOICE, OPEN_TEXT, RATING_SCALE, SINGLE_CHOICE, AGREE_DISAGREE } =
  EQuestionType;

interface Props {
  customQuestion: IAssessmentQuestion;
  onClickDelete: () => void;
  index: number;
}
const CustomQuestions = ({ customQuestion, onClickDelete, index }: Props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { updateCustomQuestions, customQuestions } = useAssessmentContext();

  const handleChangeQuestion = (value: string, name: string) => {
    let tempCustomQuestions = [...customQuestions];
    tempCustomQuestions[index].error = "";
    if (name === "question") {
      tempCustomQuestions[index].question = value;
      tempCustomQuestions[index].questionError = "";
    } else if ((name = "description")) {
      tempCustomQuestions[index].description = value;
    }
    updateCustomQuestions(tempCustomQuestions);
  };

  const handleIsRequired = (value: boolean) => {
    let tempCustomQuestions = [...customQuestions];
    tempCustomQuestions[index].is_required = value;
    updateCustomQuestions(tempCustomQuestions);
  };

  return (
    <CustomAccordion
      open={true}
      questionNumber={customQuestion.sequence}
      icon={customQuestion.icon}
      title={
        customQuestion.question ? customQuestion.question : customQuestion.title
      }
      sxSummary={{
        "& .MuiAccordionSummary-content": {
          marginTop: "10px",
          minHeight: "45px",
        },
        "& .MuiAccordionSummary-expandIconWrapper": {
          transform: "none",
        },
      }}
      endComponent={
        <ClickAwayListener
          onClickAway={() => {
            setOpenMenu(false);
          }}
        >
          <Stack
            direction={"row"}
            sx={{ gap: "0.81rem", position: "relative", alignItems: "center" }}
          >
            <TextXs text="Required" sx={{ fontWeight: "500", color: "#000" }} />
            <MUISwitch
              value={customQuestion.is_required}
              onChange={(_, value) => handleIsRequired(value)}
            />
            <Box
              sx={{
                width: "0.09rem",
                height: "1.5rem",
                backgroundColor: "var(--gray-300)",
              }}
            />
            <Image
              onClick={() => setOpenMenu(!openMenu)}
              priority
              src={DotsHorizontalIcon}
              alt={"icon"}
              width={24}
              height={24}
            />

            {openMenu && (
              <MenuCard>
                <ListButton
                  text="Delete Question"
                  onClick={() => {
                    setOpenMenu(false);
                    onClickDelete();
                  }}
                  icon={DeleteIcon}
                />
              </MenuCard>
            )}
          </Stack>
        </ClickAwayListener>
      }
    >
      <Stack sx={{ gap: "1.5rem" }}>
        <Stack>
          <LabelTopTextField
            label="Question"
            placeholder="Enter your question"
            name="question"
            value={customQuestion.question}
            onChange={(e) => handleChangeQuestion(e.target.value, "question")}
          />

          <CustomQuestionError error={customQuestion.questionError} />
        </Stack>

        <Stack>
          <LabelTopTextField
            label="Description"
            placeholder="Enter a description if needed to further explain the question"
            name="question"
            value={customQuestion.description}
            onChange={(e) =>
              handleChangeQuestion(e.target.value, "description")
            }
          />
        </Stack>
      </Stack>

      {customQuestion.type === AGREE_DISAGREE && <YesNoQuestion />}

      {customQuestion.type === OPEN_TEXT && <OpenTextQuestion />}

      {(customQuestion.type === SINGLE_CHOICE ||
        customQuestion.type === MULTI_CHOICE) && (
        <SingleSelectQuestion index={index} customQuestion={customQuestion} />
      )}

      {customQuestion.type === RATING_SCALE && (
        <RatingScaleQuestion index={index} />
      )}
    </CustomAccordion>
  );
};

export default CustomQuestions;
