import { Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import GoBackButton from "components/common/GoBackButton";
import { ASSESSMENTS, SHARE_ASSESSMENT } from "constants/pages.routes";
import { CUSTOM_ASSESSMENTS_KEY } from "constants/react_query_keys";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { EQuestionType } from "enums/assessment";
import useDefaultQuestionsData from "hooks/useDefaultQuestionsData";
import { ISelectedDefaultQuestions } from "interfaces/assessment";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { createCustomAssessment } from "services/assessment.services";
import { toastError, toastSuccess } from "utils/toaster";

interface Props {
  disabled?: boolean;
}

const Header = ({ disabled }: Props) => {
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();
  const {
    assessmentId,
    parentId,
  }: {
    assessmentId: string;
    parentId: string;
  } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const { defaultQuestions } = useDefaultQuestionsData();
  const { updateCustomQuestions, customQuestions } = useAssessmentContext();
  const queryClient = useQueryClient();

  const { deleteCustomQuestions } = useAssessmentContext();
  const [assessmentName, setAssessmentName] = useState(
    searchParams.get("name") || ""
  );

  const handleContinueClick = (save?: boolean) => {
    if (!loading && !loadingSave && defaultQuestions) {
      let error = false;
      let errorToast = "";

      let newCus = customQuestions.map((customQuestion, i) => {
        if (customQuestion.questionsType === "default") {
          return customQuestion;
        }

        if (!customQuestion.question) {
          error = true;
          customQuestion.questionError = "Required";
          errorToast = "Fill required fields";
        }

        switch (customQuestion.type) {
          case EQuestionType.MULTI_CHOICE:
          case EQuestionType.SINGLE_CHOICE:
            if (customQuestion.options.length < 2) {
              error = true;
              errorToast = "Please add at least 2 options";
              customQuestion.error = "Please add at least 2 options";
            } else {
              customQuestion.options.map((option, index) => {
                if (option.text === "") {
                  error = true;
                  errorToast = "Fill the required option";
                  customQuestion.options[index].error = "Required";
                }
              });
            }
            break;

          default:
            break;
        }

        return customQuestion;
      });

      updateCustomQuestions(newCus);

      if (error) {
        return toastError(errorToast);
      }

      if (save) {
        setLoadingSave(true);
      } else {
        setLoading(true);
      }

      mutation.mutate();
    }
  };

  const mutation = useMutation({
    mutationFn: () => {
      let selectedDefaultQuestions: ISelectedDefaultQuestions[] = [];
      let customQuesIcon = "";

      if (defaultQuestions) {
        const iconQuestion = defaultQuestions[0];

        if (iconQuestion && iconQuestion.icon) {
          customQuesIcon = iconQuestion.icon;
        }
      }

      const tempDefaultQuestions = customQuestions.find(
        (tempDefaultQuestion) => {
          return tempDefaultQuestion.questionsType === "default";
        }
      );

      if (tempDefaultQuestions) {
        selectedDefaultQuestions = tempDefaultQuestions.defaultQuestions.map(
          (defaultQuestion) => {
            return {
              question_id: defaultQuestion.question.id,
              type: defaultQuestion.type,
              sequence: defaultQuestion.sequence,
            };
          }
        );
      }

      const finalCustomQuestions = customQuestions
        .map((customQuestion) => {
          const { icon, ...questionWithoutIcon } = customQuestion;
          return questionWithoutIcon;
        })
        .filter((custQues) => {
          return custQues.questionsType !== "default";
        });

      return createCustomAssessment({
        name: assessmentName,
        parent_id: parentId,
        default_questions: selectedDefaultQuestions,
        questions: finalCustomQuestions,
        icon: customQuesIcon,
      });
    },
    onSuccess: async ({ data, status }) => {
      if (status === 201 && data.data) {
        await queryClient.invalidateQueries([CUSTOM_ASSESSMENTS_KEY]);

        if (loadingSave) {
          return router.push(ASSESSMENTS);
        }
        router.push(`${SHARE_ASSESSMENT}/${data.data.id}`);
      } else if (status === 403) {
        setLoading(false);
        setLoadingSave(false);
      }
    },
    onError: (error: any) => {
      setLoading(false);
      setLoadingSave(false);
      if (error.message) {
        toastError(error.message);
      }
    },
  });

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, []);

  return (
    <Stack
      sx={{
        gap: "1.75rem",
        margin: "1.5rem 0 1.87rem 0 ",
        paddingLeft: "2rem",
      }}
    >
      <GoBackButton
        text="Back to Assessments"
        url={ASSESSMENTS}
        onClick={deleteCustomQuestions}
      />
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          autoComplete="off"
          variant="outlined"
          placeholder="Name your assessment"
          InputProps={{ readOnly: pathname.includes("preview") ? true : false }}
          value={assessmentName}
          onChange={(e) => setAssessmentName(e.target.value)}
          sx={{
            flex: "1",
            fieldset: {
              border: "none",
            },
            input: {
              fontSize: "1.125rem",
              fontWeight: "700",
              height: "0.5rem",
              paddingLeft: "0rem",
            },
          }}
          inputRef={textFieldRef}
        />
        <Stack direction={"row"} sx={{ gap: "0.88rem" }}>
          <FilledButton
            loading={loadingSave}
            secondary
            disabled={!assessmentName || loading || loadingSave ? true : false}
            text={"Save"}
            onClick={() => {
              if (!assessmentName) {
                return toastSuccess("Enter assessment name");
              }

              handleContinueClick(true);
            }}
          />

          <FilledButton
            loading={loading}
            disabled={!assessmentName || loading || loadingSave ? true : false}
            text={"Share"}
            onClick={() => {
              if (!assessmentName) {
                return toastSuccess("Enter assessment name");
              }

              handleContinueClick();
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
