import { RadioGroup, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import CustomRating from "components/common/CustomRating/CustomRating";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import TextXs from "components/common/Text/TextXs";
import AgreeOrDisagreeQuestion from "components/ui/App/Questions/AgreeOrDisagreeQuestion";
import MultiChoiceQuestion from "components/ui/App/Questions/MultiChoiceQuestion";
import MultiResponseQuestion from "components/ui/App/Questions/MultiResponseQuestion";
import Complete from "components/ui/assessments/FinancialAssessment/Complete/Complete";
import EmojiCard from "components/ui/assessments/FinancialAssessment/CustomQuestion/Card/EmojiCard";
import NumberCard from "components/ui/assessments/FinancialAssessment/CustomQuestion/Card/NumberCard";
import FrameWork from "components/ui/assessments/FinancialAssessment/FrameWork/FrameWork";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { EAgreeDisagree, ERatingTypes } from "enums/enums";

import { EIncDec, EQuestionType } from "enums/assessment";

import { SINGLE_ASSESSMENT_KEY } from "constants/react_query_keys";
import { EFrameworkType } from "enums/framework";
import useSingleAssessmentData from "hooks/useSingleAssessmentData";
import { IHandleProceed, ISubmitAssessmentAnswer } from "interfaces/assessment";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  frameworkChildren,
  getAssessmentAnswer,
  submitAssessmentAnswer,
} from "services/assessment.services";
import { toastError } from "utils/toaster";
import FinancialLayout from "../layouts/FinancialLayout";
import SingleResponseQuestion from "./Questions/SingleResponseQuestion";

const { INCREMENT, DECREMENT } = EIncDec;
const { AGREE, DISAGREE } = EAgreeDisagree;
const { CUSTOM, CHILDREN, DIRECT } = EFrameworkType;

const {
  MULTI_CHOICE,
  SINGLE_CHOICE,
  AGREE_DISAGREE,
  OPEN_TEXT,
  FRAMEWORK,
  MULTI_RESPONSE,
  RATING_SCALE,
} = EQuestionType;

interface IMultiChoice {
  value: string[];
}

const App = () => {
  const params = useParams();
  const [visibleQuestion, setVisibleQuestion] = useState(1);
  const [completedScreen, setCompletedScreen] = useState(false);
  const queryClient = useQueryClient();
  const [isRefetching, setIsRefetching] = useState(false);
  const [isFetchingPrevious, setIsFetchingPrevious] = useState(false);
  const [hasFrameworks, setHasFrameworks] = useState(false);

  const [step, setStep] = useState(1);

  const [multiChoiceOptions, setMultiChoiceOptions] = useState<IMultiChoice[]>(
    []
  );
  const [multiResponseTextFields, setMultiResponseTextFields] = useState<
    string[]
  >([]);

  const [answer, setAnswer] = useState<{ value: string | number }[]>([]);
  const [assessmentId, clientId] = params.app as string[];

  const { assessment } = useSingleAssessmentData(assessmentId, clientId);

  const {
    selectedTopics,
    setSelectedTopics,
    selectedFrameworkChildIds,
    setSelectedFrameworkChildIds,
    selectedFrameWork,
    setSelectedFrameWork,
    selectedFrameWorkId,
    setSelectedFrameWorkId,
  } = useAssessmentContext();

  useMemo(() => {
    if (assessment) {
      if (
        visibleQuestion === 1 &&
        assessment.current_status !== assessment.completed_status
      ) {
        setVisibleQuestion(assessment.submitted_questions_count + 1);
      }

      if (assessment.current_status === assessment.completed_status) {
        setCompletedScreen(true);
        setVisibleQuestion(assessment.total_questions);
      }

      if (answer.length === 0) {
        let tempAnswers = [...answer];
        let tempMultiChoiceOptions = [...multiChoiceOptions];
        let tempMultiResponseTextFields = [...multiResponseTextFields];
        assessment?.questions.map((question, assesQuestionIndex) => {
          tempAnswers.push({ value: "" });
          tempMultiChoiceOptions.push({ value: [] });
          tempMultiResponseTextFields.push("");
          if (question.type === MULTI_CHOICE) {
            question.options.map(() => {
              tempMultiChoiceOptions[assesQuestionIndex].value.push("");
            });
          }
        });

        setAnswer(tempAnswers);
        setMultiChoiceOptions(tempMultiChoiceOptions);
        setMultiResponseTextFields(tempMultiResponseTextFields);
      }
    }
  }, [assessment]);

  const handleProceed = async ({
    sequence,
    type,
    questionIndex,
  }: IHandleProceed) => {
    if (assessment) {
      switch (type) {
        case DECREMENT:
          setIsFetchingPrevious(true);
          if (sequence != 1) {
            const question = assessment.questions[questionIndex];
            if (question.type === MULTI_RESPONSE) {
              await queryClient.invalidateQueries([SINGLE_ASSESSMENT_KEY]);
            }
            const answerResponse = await getAssessmentAnswer(
              assessment.fha_has_client,
              question.id,
              question.type
            );

            if (answerResponse.data && answerResponse.data.data) {
              let tempAnswer = [...answer];
              let tempMultiChoiceOptions = [...multiChoiceOptions];

              switch (question.type) {
                case MULTI_CHOICE:
                  const filteredAnswer = answerResponse.data.data.map((val) => {
                    return val.option.id;
                  });

                  let tempOptions = tempMultiChoiceOptions[questionIndex].value;
                  question.options.forEach((val, idx) => {
                    if (val.id && filteredAnswer.includes(val.id)) {
                      tempOptions[idx] = val.id.toString();
                    } else {
                      tempOptions[idx] = "";
                    }
                  });

                  setMultiChoiceOptions(tempMultiChoiceOptions);

                  break;

                case MULTI_RESPONSE:
                  if (
                    answerResponse.data.data &&
                    !assessment.questions[
                      questionIndex
                    ].multi_response_questions.find(
                      (i) =>
                        i.id ===
                        answerResponse.data.data.multi_response_question.id
                    )
                  ) {
                    assessment.questions[
                      questionIndex
                    ].multi_response_questions.push({
                      id: answerResponse.data.data.multi_response_question.id,
                      question:
                        answerResponse.data.data.multi_response_question
                          .question,
                      default_response: answerResponse.data.data.response,
                      description:
                        answerResponse.data.data.multi_response_question
                          .description,
                      icon: answerResponse.data.data.multi_response_question
                        .icon,
                      sequence:
                        answerResponse.data.data.multi_response_question
                          .sequence,
                    });

                    assessment.questions[
                      questionIndex
                    ].multi_response_questions.sort((a, b) =>
                      !isNaN(Number(a.sequence))
                        ? Number(a.sequence) - Number(b.sequence)
                        : 0
                    );

                    tempAnswer[questionIndex].value =
                      answerResponse.data.data.multi_response_question.id;

                    setAnswer(tempAnswer);
                  }

                  break;

                case SINGLE_CHOICE:
                  tempAnswer = [...answer];
                  tempAnswer[questionIndex].value =
                    answerResponse.data.data.option_id;

                  setAnswer(tempAnswer);

                  break;

                case AGREE_DISAGREE:
                  tempAnswer = [...answer];
                  tempAnswer[questionIndex].value =
                    answerResponse.data.data.option_id;

                  setAnswer(tempAnswer);

                  break;

                case RATING_SCALE:
                  tempAnswer = [...answer];
                  tempAnswer[questionIndex].value =
                    answerResponse.data.data.value;

                  setAnswer(tempAnswer);

                  break;

                case OPEN_TEXT:
                  tempAnswer = [...answer];
                  tempAnswer[questionIndex].value =
                    answerResponse.data.data.response;

                  setAnswer(tempAnswer);

                  break;

                case FRAMEWORK:
                  const filteredTopics = answerResponse.data.data.map((val) => {
                    return {
                      id: val.category_id,
                      type: "",
                      name: val.category.name,
                      icon: val.category.icon,
                      code: val.category.code,
                      parent: {
                        name: val.category.parent.name,
                      },
                      embrace: val.category.embrace,
                      description: val.category.description,
                      oppose_n_engage: val.category.oppose_n_engage,
                      background_color: val.category.background_color,
                      preference: val.preference_id,
                      weight: 0,
                      value: val.weight,
                      isDisable: false,
                      frameworkType: val.user_selection_type,
                      childFrameworkdIds: val.child_framework_ids,
                      frameworkId: val.framework_id,
                    };
                  });

                  setSelectedFrameWorkId(filteredTopics[0].frameworkId);

                  switch (filteredTopics[0].frameworkType) {
                    case CUSTOM:
                      setSelectedTopics(filteredTopics);
                      break;
                    case CHILDREN:
                      let frameworkId = filteredTopics[0].frameworkId;
                      setSelectedFrameworkChildIds({
                        [frameworkId]: filteredTopics[0].childFrameworkdIds,
                      });
                      const prevSelectedFramework = assessment.questions[
                        questionIndex
                      ].question_has_frameworks.find((framework) => {
                        return (
                          framework.frameworks.id ===
                          filteredTopics[0].frameworkId
                        );
                      });

                      if (prevSelectedFramework) {
                        setSelectedFrameWork(prevSelectedFramework);
                      }

                      await setValuesChildDirect(
                        filteredTopics,
                        filteredTopics[0].childFrameworkdIds
                      );

                      break;
                    case DIRECT:
                      await setValuesChildDirect(filteredTopics, [
                        filteredTopics[0].frameworkId,
                      ]);

                      break;

                    default:
                      break;
                  }

                  setStep(3);

                  break;

                default:
                  break;
              }
            }

            setVisibleQuestion(sequence - 1);
          }
          setIsFetchingPrevious(false);
          break;

        case INCREMENT:
          const selectedQuestion = assessment.questions[questionIndex];

          if (selectedQuestion) {
            let data = {
              client_id: clientId,
              question_id: selectedQuestion.id,
              question_type: selectedQuestion.type,
              fha_has_client: assessment.fha_has_client,
            } as ISubmitAssessmentAnswer;

            if (
              selectedQuestion.type !== FRAMEWORK &&
              selectedQuestion.type !== MULTI_CHOICE
            ) {
              if (
                !answer[questionIndex].value &&
                selectedQuestion.is_required
              ) {
                setIsRefetching(false);
                toastError("Select response");
                return;
              }
            }

            switch (selectedQuestion.type) {
              case MULTI_RESPONSE:
                setIsRefetching(true);
                data.mutli_response_question_id = `${answer[questionIndex].value}`;
                const requiredOption =
                  selectedQuestion.multi_response_questions.find(
                    (multi_response_question) => {
                      return (
                        multi_response_question.id ===
                        `${answer[questionIndex].value}`
                      );
                    }
                  );

                if (requiredOption) {
                  data.value = requiredOption.default_response;
                }

                if (data.value) {
                  break;
                }

                if (
                  !multiResponseTextFields[questionIndex] &&
                  selectedQuestion.is_required
                ) {
                  setIsRefetching(false);
                  toastError("Write your answer");
                  return;
                }

                data.value = multiResponseTextFields[questionIndex];

                break;

              case SINGLE_CHOICE:
              case AGREE_DISAGREE:
                data.option_id = `${answer[questionIndex].value}`;
                break;

              case OPEN_TEXT:
                data.value = `${answer[questionIndex].value}`;
                break;

              case RATING_SCALE:
                data.value = answer[questionIndex].value.toString();
                data.rating_id = selectedQuestion.ratings[0].id;
                break;

              default:
                break;
            }

            const promisesResponse: any[] = [];
            let res: any;
            if (selectedQuestion.type === FRAMEWORK) {
              const filteredTopics = selectedTopics.filter((topic) => {
                return topic.preference && parseInt(`${topic.value}`);
              });
              if (filteredTopics.length) {
                const desiredArray = filteredTopics.map((topic) => {
                  return {
                    category_id: topic.id,
                    preference_id: topic.preference,
                    framework_id: selectedFrameWorkId,
                    user_framework_selection_type:
                      topic.frameworkType as EFrameworkType,
                    weight: parseInt(`${topic.value}`),
                    child_framework_ids:
                      selectedFrameworkChildIds[selectedFrameWorkId] ?? [],
                  };
                });

                const res = await mutation.mutateAsync({
                  ...data,
                  framework_selections: desiredArray,
                });
                promisesResponse.push(res.data);
              } else {
                setIsRefetching(false);
                toastError(
                  "Please select topics preferences and their importances."
                );
              }
            } else if (selectedQuestion.type === MULTI_CHOICE) {
              const isEmptyStrings = multiChoiceOptions[
                questionIndex
              ].value.every((item) => item === "");

              if (isEmptyStrings && !selectedQuestion.is_required) {
                const res = await mutation.mutateAsync({
                  ...data,
                  option_id: null,
                });
                promisesResponse.push(res.data);
              } else if (!isEmptyStrings) {
                for (
                  let i = 0;
                  i < multiChoiceOptions[questionIndex].value.length;
                  i++
                ) {
                  const element = multiChoiceOptions[questionIndex].value[i];
                  if (element) {
                    const res = await mutation.mutateAsync({
                      ...data,
                      option_id: element,
                    });
                    promisesResponse.push(res.data);
                  }
                }
              } else {
                setIsRefetching(false);
                toastError("Select response");
                return;
              }
            } else {
              res = await mutation.mutateAsync(data);
              const question = assessment.questions[questionIndex + 1];

              if (question) {
                const answerResponse = await getAssessmentAnswer(
                  assessment.fha_has_client,
                  question.id,
                  question.type
                );

                switch (question.type) {
                  case MULTI_RESPONSE:
                    if (answerResponse.data && answerResponse.data.data) {
                      let tempAnswer = [...answer];
                      if (
                        answerResponse.data.data &&
                        !assessment.questions[
                          questionIndex + 1
                        ].multi_response_questions.find(
                          (i) =>
                            i.id ===
                            answerResponse.data.data.multi_response_question.id
                        )
                      ) {
                        assessment.questions[
                          questionIndex + 1
                        ].multi_response_questions.push({
                          id: answerResponse.data.data.multi_response_question
                            .id,
                          question:
                            answerResponse.data.data.multi_response_question
                              .question,
                          default_response: answerResponse.data.data.response,
                          description:
                            answerResponse.data.data.multi_response_question
                              .description,
                          icon: answerResponse.data.data.multi_response_question
                            .icon,
                          sequence:
                            answerResponse.data.data.multi_response_question
                              .sequence,
                        });

                        assessment.questions[
                          questionIndex + 1
                        ].multi_response_questions.sort((a, b) =>
                          !isNaN(Number(a.sequence))
                            ? Number(a.sequence) - Number(b.sequence)
                            : 0
                        );

                        tempAnswer[questionIndex].value =
                          answerResponse.data.data.multi_response_question.id;

                        setAnswer(tempAnswer);
                      }

                      break;
                    }
                }
              }
            }

            if (questionIndex === assessment.questions.length - 1) {
              setCompletedScreen(true);
              return;
            }

            if (
              (sequence < assessment.questions.length && res) ||
              (data.question_type === FRAMEWORK && promisesResponse.length) ||
              (data.question_type === MULTI_CHOICE && promisesResponse.length)
            ) {
              if (data.question_type === MULTI_RESPONSE) {
                await queryClient.invalidateQueries([SINGLE_ASSESSMENT_KEY]);
              }

              setIsRefetching(false);
              setVisibleQuestion(sequence + 1);
            }
          }

          break;

        default:
          break;
      }
    }
  };

  const setValuesChildDirect = async (filteredTopics, ids) => {
    const { data } = await frameworkChildren(ids);

    if (data) {
      const list = data.data.map((topic) => {
        const existing_topic = filteredTopics.find(
          (i) => i.id === topic.category.id
        );
        return {
          ...topic.category,
          preference: !existing_topic ? "" : existing_topic.preference,
          weight: !existing_topic ? 0 : existing_topic.value,
          value: !existing_topic ? 0 : existing_topic.value,
          isDisable: true,
          frameworkType: filteredTopics[0].frameworkType,
          childFrameworkdIds: filteredTopics[0].childFrameworkdIds,
          frameworkId: filteredTopics[0].frameworkId,
        };
      });
      setSelectedTopics([...list]);
    }
  };

  const progressBar = assessment
    ? ((visibleQuestion - 1) / (assessment.questions.length - 1)) * 100
    : 0;

  const mutation = useMutation({
    mutationFn: (assessmentAnswer: ISubmitAssessmentAnswer) =>
      submitAssessmentAnswer(assessmentAnswer),
    onSuccess: async () => {},
    onError: () => {
      setIsRefetching(false);
    },
  });

  const handleSetAnswer = (value: string | number, index: number) => {
    let tempAnswers = [...answer];
    tempAnswers[index].value = value;
    setAnswer(tempAnswers);
  };

  const handleMultiResponseTextFields = (value: string, index: number) => {
    let tempMultiResponseTextFields = [...multiResponseTextFields];
    tempMultiResponseTextFields[index] = value;
    setMultiResponseTextFields(tempMultiResponseTextFields);
  };

  return (
    <>
      <FinancialLayout
        title={assessment ? assessment.name : ""}
        value={progressBar}
      >
        {!completedScreen &&
          answer.length > 0 &&
          assessment &&
          assessment.questions.map(
            (
              {
                question,
                sequence,
                type,
                question_has_frameworks,
                options,
                multi_response_questions,
                ratings,
                is_required,
                description,
              },
              questionIndex
            ) => {
              if (!is_required) {
                question = `${question} (Optional)`;
              }

              return (
                <Stack
                  key={questionIndex}
                  direction={"column"}
                  sx={{
                    justifyContent: "center",
                    display: sequence === visibleQuestion ? "flex" : "none",
                  }}
                >
                  {type === AGREE_DISAGREE && (
                    <AgreeOrDisagreeQuestion
                      sx={{
                        color: "var(--text-grey)",
                        fontSize: "1.5rem",
                        fontStyle: "normal",
                        lineHeight: "2rem",
                        fontWeight: "500",
                      }}
                      question={question}
                      description={description}
                      agreeOrDisagree={
                        answer[questionIndex].value === options[0].id
                          ? AGREE
                          : answer[questionIndex].value === options[1].id
                          ? DISAGREE
                          : ""
                      }
                      onClick={(agreeOrDisagree) => {
                        if (options[0].id && options[1].id) {
                          if (agreeOrDisagree === AGREE) {
                            handleSetAnswer(options[0].id, questionIndex);
                          } else if (agreeOrDisagree === DISAGREE) {
                            handleSetAnswer(options[1].id, questionIndex);
                          }
                        }
                      }}
                    />
                  )}

                  {type === OPEN_TEXT && (
                    <Stack
                      sx={{
                        marginBottom: "3rem",
                      }}
                    >
                      <TextXs
                        sx={{
                          color: "var(--text-grey)",
                          fontSize: "1.5rem",
                          fontStyle: "normal",
                          lineHeight: "2rem",
                          fontWeight: "500",
                        }}
                        text={question}
                      />
                      {description && (
                        <TextXs
                          text={description}
                          sx={{ color: "var(--text-secondary)" }}
                        />
                      )}

                      <LabelTopTextField
                        maxLength={2000}
                        multiline
                        rows={5}
                        label=""
                        placeholder="Enter your response here"
                        name="response"
                        value={`${answer[questionIndex].value}`}
                        onChange={(e) => {
                          handleSetAnswer(e.target.value, questionIndex);
                        }}
                        sx={{
                          marginTop: "1.5rem",
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "var(--background-color2)",
                            ".Mui-disabled": {
                              WebkitTextFillColor: "var(--text-secondary)",
                            },
                          },
                        }}
                      />

                      <TextXs
                        text="2000 character limit"
                        sx={{
                          marginTop: "0.37rem",
                          lineHeight: "1.25rem",
                          color: "var(--text-secondary)",
                        }}
                      />
                    </Stack>
                  )}

                  {type === RATING_SCALE && (
                    <>
                      <TextXs
                        sx={{
                          color: "var(--text-grey)",
                          fontSize: "1.5rem",
                          fontStyle: "normal",
                          lineHeight: "2rem",
                          fontWeight: "500",
                        }}
                        text={question}
                      />

                      {description && (
                        <TextXs
                          text={description}
                          sx={{ color: "var(--text-secondary)", mb: "0.5rem" }}
                        />
                      )}

                      {ratings[0].rating_type === ERatingTypes.NUMBER && (
                        <NumberCard
                          ratings={ratings[0]}
                          value={answer[questionIndex].value}
                          onClick={(value) => {
                            handleSetAnswer(value, questionIndex);
                          }}
                        />
                      )}

                      {ratings[0].rating_type === ERatingTypes.STAR && (
                        <CustomRating
                          value={answer[questionIndex].value}
                          onChange={(value) => {
                            if (value) {
                              handleSetAnswer(value, questionIndex);
                            }
                          }}
                        />
                      )}

                      {ratings[0].rating_type === ERatingTypes.SMILEY && (
                        <EmojiCard
                          value={answer[questionIndex].value}
                          onClick={(value) => {
                            handleSetAnswer(value, questionIndex);
                          }}
                        />
                      )}
                    </>
                  )}

                  {type === FRAMEWORK && (
                    <>
                      <FrameWork
                        step={step}
                        hasFrameworks={hasFrameworks}
                        setHasFrameworks={setHasFrameworks}
                        selectedFrameWork={selectedFrameWork}
                        setStep={setStep}
                        frameworks={question_has_frameworks}
                        fhaHasClient={assessment.fha_has_client}
                        onClickPrev={() =>
                          handleProceed({
                            sequence: visibleQuestion,
                            type: DECREMENT,
                            questionIndex: questionIndex - 1,
                          })
                        }
                        onClickNext={() =>
                          handleProceed({
                            sequence: visibleQuestion,
                            type: INCREMENT,
                            questionIndex: questionIndex,
                          })
                        }
                        isFetchingPrevious={isFetchingPrevious}
                        loading={mutation.isLoading}
                        visibleQuestion={visibleQuestion}
                      />
                    </>
                  )}

                  {type === MULTI_RESPONSE && (
                    <>
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: question,
                        }}
                        sx={{
                          color: "var(--text-primary)",
                          fontSize: "1.5rem",
                          lineHeight: "2rem",
                          span: { "&.blue-color": { color: "var(--primary)" } },
                        }}
                      />

                      {description && (
                        <TextXs
                          text={description}
                          sx={{ color: "var(--text-secondary)", mb: "0.5rem" }}
                        />
                      )}

                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={(__, value) => {
                          handleSetAnswer(value, questionIndex);
                        }}
                      >
                        {multi_response_questions.map(
                          (multiResponseQuestion) => (
                            <MultiResponseQuestion
                              maxLength={250}
                              icon={multiResponseQuestion.icon}
                              onFocusTextField={() => {
                                handleSetAnswer(
                                  `${multiResponseQuestion.id}`,
                                  questionIndex
                                );
                              }}
                              isChecked={
                                answer[questionIndex].value ==
                                multiResponseQuestion.id
                              }
                              onChangeTextfield={(e) => {
                                if (
                                  Boolean(
                                    !multiResponseQuestion.default_response
                                  )
                                ) {
                                  handleMultiResponseTextFields(
                                    e.target.value,
                                    questionIndex
                                  );
                                  handleSetAnswer(
                                    `${multiResponseQuestion.id}`,
                                    questionIndex
                                  );
                                }
                              }}
                              multiResponseTextfield={
                                multiResponseTextFields[questionIndex]
                              }
                              multiResponseQuestion={multiResponseQuestion}
                              isDefault={Boolean(
                                !multiResponseQuestion.default_response
                              )}
                              key={multiResponseQuestion.id}
                              sx={{
                                marginTop: "1.5rem",
                              }}
                            />
                          )
                        )}
                      </RadioGroup>
                    </>
                  )}

                  {type === SINGLE_CHOICE && (
                    <>
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: question,
                        }}
                        sx={{
                          color: "var(--text-primary)",
                          fontSize: "1.5rem",
                          lineHeight: "2rem",
                          span: { "&.blue-color": { color: "var(--primary)" } },
                        }}
                      />

                      {description && (
                        <TextXs
                          text={description}
                          sx={{
                            color: "var(--text-secondary)",
                            maxWidth: "43.4375rem",
                          }}
                        />
                      )}

                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={(_, value) => {
                          handleSetAnswer(value, questionIndex);
                        }}
                      >
                        <SingleResponseQuestion
                          value={answer[questionIndex].value}
                          options={options}
                        />
                      </RadioGroup>
                    </>
                  )}

                  {type === MULTI_CHOICE && (
                    <>
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: question,
                        }}
                        sx={{
                          color: "var(--text-primary)",
                          fontSize: "1.5rem",
                          lineHeight: "2rem",
                          span: { "&.blue-color": { color: "var(--primary)" } },
                        }}
                      />

                      {description && (
                        <TextXs
                          text={description}
                          sx={{ color: "var(--text-secondary)" }}
                        />
                      )}

                      <Stack
                        sx={{
                          marginTop: "1.5rem",
                          gap: "0.75rem",
                        }}
                      >
                        {options.map((option, multiChoiceIndex) => (
                          <MultiChoiceQuestion
                            key={option.id}
                            value={
                              option.id?.toString() ==
                              multiChoiceOptions[questionIndex].value[
                                multiChoiceIndex
                              ]
                            }
                            label={option.text}
                            onChange={(_, value) => {
                              let tempMultiChoiceOptions = [
                                ...multiChoiceOptions,
                              ];

                              if (value) {
                                tempMultiChoiceOptions[questionIndex].value[
                                  multiChoiceIndex
                                ] = `${option.id}`;
                              } else {
                                tempMultiChoiceOptions[questionIndex].value[
                                  multiChoiceIndex
                                ] = "";
                              }

                              setMultiChoiceOptions(tempMultiChoiceOptions);
                            }}
                          />
                        ))}
                      </Stack>
                    </>
                  )}

                  {type !== FRAMEWORK && (
                    <Stack
                      direction={"row"}
                      sx={{
                        marginTop: "2rem",

                        gap: "1.5rem",
                      }}
                    >
                      {visibleQuestion > 1 && (
                        <FilledButton
                          loading={isFetchingPrevious}
                          disabled={
                            mutation.isLoading ||
                            isRefetching ||
                            isFetchingPrevious
                          }
                          onClick={() =>
                            handleProceed({
                              sequence: visibleQuestion,
                              type: DECREMENT,
                              questionIndex: questionIndex - 1,
                            })
                          }
                          secondary
                          text="Previous step"
                        />
                      )}

                      <FilledButton
                        disabled={
                          mutation.isLoading ||
                          isRefetching ||
                          isFetchingPrevious
                        }
                        loading={mutation.isLoading || isRefetching}
                        onClick={() => {
                          handleProceed({
                            sequence: visibleQuestion,
                            type: INCREMENT,
                            questionIndex: questionIndex,
                          });
                        }}
                        text={
                          questionIndex === assessment.questions.length - 1
                            ? "Complete Assessment"
                            : "Proceed"
                        }
                      />
                    </Stack>
                  )}
                </Stack>
              );
            }
          )}

        {completedScreen && assessment && (
          <Complete
            firm_name={assessment.firm_name}
            firm_logo={assessment.firm_logo}
            firm_member_email={assessment.firm_member_email}
            firm_member_name={assessment.firm_member_name}
            firm_member_phone={assessment.firm_member_phone}
            assessment_template_name={assessment.assessment_template_name}
          />
        )}
      </FinancialLayout>
    </>
  );
};

export default App;
