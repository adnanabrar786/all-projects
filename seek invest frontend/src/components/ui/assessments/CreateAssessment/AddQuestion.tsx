import { addQuestionsType } from "constants/data";
import { AddBlackIcon } from "constants/images.routes";

import { Box, Stack } from "@mui/material";
import CustomAccordion from "components/common/Accordion/CustomAccordion";
import IconText from "components/common/IconText";
import CustomQuestions from "components/ui/assessments/CreateAssessment/CustomQuestions";
import DefaultQuestions from "components/ui/assessments/CreateAssessment/DefaultQuestions";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { EQuestionType } from "enums/assessment";
import { ERatingTypes } from "enums/enums";
import useDefaultQuestionsData from "hooks/useDefaultQuestionsData";
import {
  IAssessmentQuestion,
  Options,
  RatingScale,
} from "interfaces/assessment";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const AddQuestion = () => {
  const { updateCustomQuestions, customQuestions } = useAssessmentContext();
  const { defaultQuestions } = useDefaultQuestionsData();

  const handleDeleteQuestion = (index: number) => {
    let tempCustomQuestions = [...customQuestions];
    tempCustomQuestions.splice(index, 1);
    updateCustomQuestionSequence(tempCustomQuestions);
    updateCustomQuestions(tempCustomQuestions);
  };

  const handleAddCustomQuestion = (addQuestionType) => {
    if (defaultQuestions) {
      let options: Options[] = [];
      let ratings: RatingScale = {
        start_value: 1,
        end_value: 5,
        start_value_label: "",
        end_value_label: "",
        rating_type: ERatingTypes.NUMBER,
      };

      if (addQuestionType.type === EQuestionType.AGREE_DISAGREE) {
        options = [
          {
            text: "AGREE",
          },
          {
            text: "DISAGREE",
          },
        ];
      }

      updateCustomQuestions([
        ...customQuestions,
        {
          ...addQuestionType,
          is_required: true,
          sequence: defaultQuestions.length + customQuestions.length,
          question: "",
          description: "",
          options,
          type: addQuestionType.type,
          error: "",
          ratings:
            addQuestionType.type === EQuestionType.RATING_SCALE
              ? ratings
              : undefined,
        },
      ]);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    let reorderedItems = [...customQuestions];
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    updateCustomQuestionSequence(reorderedItems);
    updateCustomQuestions(reorderedItems);
  };

  const updateCustomQuestionSequence = (
    reorderedItems: IAssessmentQuestion[]
  ) => {
    if (defaultQuestions) {
      const defaultQuestionsItem = reorderedItems.find((reorderedItem) => {
        return reorderedItem.questionsType === "default";
      });

      if (defaultQuestionsItem) {
        const defaultQuestionsItemIndex =
          reorderedItems.indexOf(defaultQuestionsItem);

        let tempIndex = 0;

        reorderedItems.forEach((tempCustomQuestion, index) => {
          if (defaultQuestionsItemIndex > index) {
            tempCustomQuestion.sequence = tempIndex + 1;
          } else if (defaultQuestionsItemIndex === index) {
            tempCustomQuestion.defaultQuestions.forEach(
              (defaultQuestion, defaultQuesIndex) => {
                defaultQuestion.sequence = tempIndex + defaultQuesIndex + 1;
              }
            );
          } else {
            tempCustomQuestion.sequence = defaultQuestions.length + tempIndex;
          }
          tempIndex += 1;
        });
      }
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board">
          {(provided) => (
            <Stack
              sx={{ gap: "1rem" }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {customQuestions?.map((customQuestion, index) =>
                customQuestion.questionsType === "default" ? (
                  <Draggable
                    draggableId={customQuestion.questionsType}
                    index={index}
                    key={index}
                  >
                    {(provided) => (
                      <Stack
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DefaultQuestions />
                      </Stack>
                    )}
                  </Draggable>
                ) : (
                  <Draggable
                    key={index}
                    draggableId={`${customQuestion.sequence}`}
                    index={index}
                  >
                    {(provided) => (
                      <Stack
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CustomQuestions
                          key={index}
                          customQuestion={customQuestion}
                          index={index}
                          onClickDelete={() => {
                            handleDeleteQuestion(index);
                          }}
                        />
                      </Stack>
                    )}
                  </Draggable>
                )
              )}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>

      <CustomAccordion
        icon={AddBlackIcon}
        title="Add Question"
        desc="Select from multiple question formats like open text, multiple choice, rating scales etc."
        sx={{ border: "1px dashed var(--gray-200)" }}
        sxIcon={{ backgroundColor: "var(--purple-light)" }}
        showMenuIcon
        addIcon
      >
        <Stack sx={{ gap: "0.75rem" }}>
          {addQuestionsType.map((addQuestionType, index) => (
            <Box
              key={index}
              onClick={() => handleAddCustomQuestion(addQuestionType)}
            >
              <IconText
                sxRow={{ cursor: "pointer" }}
                text={addQuestionType.title}
                icon={addQuestionType.icon}
                iconWidth={22}
                iconHeight={16}
              />
            </Box>
          ))}
        </Stack>
      </CustomAccordion>
    </>
  );
};

export default AddQuestion;
