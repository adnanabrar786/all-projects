import { Stack, Typography } from "@mui/material";
import BgIcon from "components/common/Icon/BgIcon";
import TextXs from "components/common/Text/TextXs";
import { ecosystemPreservation } from "constants/images.routes";
import { EQuestionType } from "enums/assessment";
import { IDefaultQuestion } from "interfaces/assessment";
import { getQuestionType } from "utils/assessments";

const { FRAMEWORK } = EQuestionType;

interface Props {
  defaultQuestion: IDefaultQuestion;
  index: number;
}

const DefaultQuestion = ({ defaultQuestion }: Props) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        gap: "1rem",
        position: "relative",
        borderTop: "1px solid var(--gray-200)",
        py: "1rem",
      }}
    >
      <TextXs
        text={`${defaultQuestion.sequence}`}
        sx={{
          position: "absolute",
          left: defaultQuestion.sequence < 10 ? "-40px" : "-45px",
          border: "1px solid var(--gray-200)",
          borderRadius: "0.25rem 0 0 0.25rem",
          borderRight: "none",
          paddingX: "0.45rem",
          fontSize: "0.75rem",
          fontWeight: "700",
        }}
      />
      {defaultQuestion.question.icon && (
        <BgIcon
          icon={defaultQuestion.question.icon}
          iconWidth={16}
          iconHeight={16}
        />
      )}
      <Stack>
        <Typography
          dangerouslySetInnerHTML={{
            __html: defaultQuestion.question.question,
          }}
          sx={{
            fontWeight: "700",
            color: "var(--text-primary)",
            fontSize: "0.8125rem",
            span: { "&.blue-color": { color: "var(--primary)" } },
          }}
        />

        {defaultQuestion.type === FRAMEWORK && (
          <BgIcon icon={ecosystemPreservation} iconWidth={20} iconHeight={19} />
        )}

        <TextXs
          text={
            defaultQuestion.question.description ||
            `${getQuestionType(defaultQuestion.type)}`
          }
          sx={{
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
          }}
        />
      </Stack>
    </Stack>
  );
};

export default DefaultQuestion;
