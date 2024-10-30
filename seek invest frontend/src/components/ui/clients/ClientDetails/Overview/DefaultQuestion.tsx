import { Stack, Typography } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import DefaultQuestionsSkeleton from "components/ui/clients/ClientDetails/Overview/DefaultQuestionsSkeleton";
import { IClientDetailDefaultQuestion } from "interfaces/client";

interface Props {
  questions: IClientDetailDefaultQuestion[];
}

const DefaultQuestion = ({ questions }: Props) => {
  return (
    <>
      <Stack
        sx={{
          padding: "0.62rem 1rem",
          gap: "1rem",
        }}
      >
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <Stack
              sx={{
                gap: "0.12rem",
              }}
              key={index}
            >
              <Typography
                dangerouslySetInnerHTML={{
                  __html: question.question,
                }}
                sx={{
                  color: "var(--text-primary)",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  lineHeight: "1.125rem",
                  span: { "&.blue-color": { color: "var(--primary)" } },
                }}
              />

              <TextXs
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                }}
                text={question.answer}
              />
            </Stack>
          ))
        ) : (
          <DefaultQuestionsSkeleton />
        )}
      </Stack>
    </>
  );
};

export default DefaultQuestion;
