import { Stack } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import QuestionCard from "components/ui/assessments/FHAs/Overview/Questions/QuestionCard";
import { OpenTextIcon } from "constants/images.routes";
import { IAssessmentResponse } from "interfaces/assessment";

interface Props {
  question: string;
  response: IAssessmentResponse[];
}

const OpenText = ({ question, response }: Props) => {
  return (
    <QuestionCard
      question={question}
      questionSubText={`${response ? response.length : 0} responses`}
      icon={OpenTextIcon}
      iconText="Open text"
    >
      {response.map((data, index) => (
        <Stack key={index} sx={{ mt: "2rem" }}>
          <Stack
            direction={"row"}
            sx={{
              gap: "0.25rem",
              color: "var(--text-secondary)",
              alignItems: "center",
            }}
          >
            <TextXs text={data.name} sx={{ color: "var(--text-secondary)" }} />
            <TextXs
              text="•"
              sx={{ fontWeight: "600", color: "var(--text-secondary)" }}
            />
            <TextXs
              text={"Answer"}
              sx={{ fontWeight: "600", color: "var(--text-secondary)" }}
            />
          </Stack>
          <TextXs text={data.text} sx={{ marginTop: "1rem" }} />
        </Stack>
      ))}
    </QuestionCard>
  );
};

export default OpenText;
