import { Stack, capitalize } from "@mui/material";
import AgreeOrDisagree from "components/ui/assessments/FHAs/Overview/Questions/AgreeOrDisagree";
import MultiResponse from "components/ui/assessments/FHAs/Overview/Questions/MultiResponse";
import MultiSelect from "components/ui/assessments/FHAs/Overview/Questions/MultiSelect";
import OpenText from "components/ui/assessments/FHAs/Overview/Questions/OpenText";
import Preference from "components/ui/assessments/FHAs/Overview/Questions/Preference";
import RatingScale from "components/ui/assessments/FHAs/Overview/Questions/RatingScale";
import SingleSelect from "components/ui/assessments/FHAs/Overview/Questions/SingleSelect";
import { EQuestionType } from "enums/assessment";
import useAssessmentOverview from "hooks/useAssessmentOverview";
import { useParams } from "next/navigation";

const {
  MULTI_CHOICE,
  SINGLE_CHOICE,
  AGREE_DISAGREE,
  OPEN_TEXT,
  FRAMEWORK,
  MULTI_RESPONSE,
  RATING_SCALE,
} = EQuestionType;

const Questions = () => {
  const { assessmentId } = useParams();
  const { assessmentData } = useAssessmentOverview(assessmentId as string);

  return (
    <Stack sx={{ mt: "5rem", gap: "1.5rem", marginBottom: "2.25rem" }}>
      {assessmentData?.assessment_has_questions.map(
        ({ type, question, response }, index) => (
          <Stack sx={{ gap: "1.5rem" }} key={index}>
            {/* DONE */}
            {type === AGREE_DISAGREE && (
              <AgreeOrDisagree
                question={question.question}
                options={question.options}
                response={response}
              />
            )}

            {/* DONE */}
            {type === SINGLE_CHOICE && (
              <SingleSelect
                question={question.question}
                options={question.options}
                response={response}
              />
            )}
            {type === MULTI_CHOICE && (
              <MultiSelect
                question={question.question}
                options={question.options}
                response={response}
              />
            )}

            {type === MULTI_RESPONSE && (
              <MultiResponse
                question={question.question}
                options={response}
                response={response}
              />
            )}

            {/* DONE */}
            {type === OPEN_TEXT && (
              <OpenText question={question.question} response={response} />
            )}

            {type === RATING_SCALE && (
              <>
                <RatingScale
                  question={question.question}
                  scaleType={capitalize(
                    question.ratings[0].rating_type.toLowerCase()
                  )}
                  response={response}
                />
              </>
            )}
            {type === FRAMEWORK && (
              <Preference question={question.question} response={response} />
            )}
          </Stack>
        )
      )}
    </Stack>
  );
};

export default Questions;
