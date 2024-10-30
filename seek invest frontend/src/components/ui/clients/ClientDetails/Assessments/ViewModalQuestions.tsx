import { Box, Stack, Typography } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import {
  FaceContentIcon,
  FaceFrownIcon,
  FaceHappyIcon,
  FaceNeutralIcon,
  FaceSadIcon,
  OneStarIcon,
} from "constants/images.routes";
import { EQuestionType } from "enums/assessment";
import { ERatingTypes } from "enums/enums";
import Image from "next/image";

const {
  AGREE_DISAGREE,
  FRAMEWORK,
  MULTI_CHOICE,
  MULTI_RESPONSE,
  OPEN_TEXT,
  RATING_SCALE,
  SINGLE_CHOICE,
} = EQuestionType;

const { NUMBER, SMILEY, STAR } = ERatingTypes;

interface Props {
  question: any;
}

const faces = [
  { label: "Strongly Dislike", icon: FaceSadIcon },
  { label: "Dislike", icon: FaceFrownIcon },
  { label: "Neutral", icon: FaceNeutralIcon },
  { label: "Like", icon: FaceContentIcon },
  { label: "Strongly Like", icon: FaceHappyIcon },
];

const ViewModalQuestions = ({ question }: Props) => {
  const viewModelQuestions = () => {
    switch (question.type) {
      case AGREE_DISAGREE:
      case OPEN_TEXT:
      case SINGLE_CHOICE:
      case MULTI_RESPONSE:
        return (
          <Typography
            dangerouslySetInnerHTML={{
              __html: question.answer
                .replace(/;/g, `<br />`)
                .replaceAll(";", " "),
            }}
            sx={{
              color: "var(--text-secondary)",
              fontSize: "0.75rem",
            }}
          />
        );
      case MULTI_CHOICE:
        return (
          <Stack>
            {question.answer.split(", ").map((option, index) => (
              <Stack
                key={index}
                direction={"row"}
                sx={{ alignItems: "center", gap: "0.5rem" }}
              >
                <Box
                  sx={{
                    width: "0.3rem",
                    height: "0.3rem",
                    backgroundColor: "var(--text-secondary)",
                    borderRadius: "50%",
                    ml: "0.75rem",
                  }}
                />
                <TextXs text={option} sx={{ color: "var(--text-secondary)" }} />
              </Stack>
            ))}
          </Stack>
        );

      case RATING_SCALE:
        return (
          <>
            {question.rating_type === NUMBER && (
              <TextXs text={`${question.answer} Points`} />
            )}

            {question.rating_type === STAR && (
              <Stack direction={"row"}>
                {Array.from({ length: question.answer }).map((_, index) => (
                  <Image
                    key={index}
                    priority
                    src={OneStarIcon}
                    alt={"icon"}
                    width={18}
                    height={18}
                  />
                ))}
              </Stack>
            )}

            {question.rating_type === SMILEY && (
              <Stack
                direction={"row"}
                sx={{ gap: "0.25rem", alignItems: "center" }}
              >
                <TextXs
                  text={faces[question.answer - 1].label}
                  sx={{
                    textTransform: "capitalize",
                    color: "var(--text-secondary)",
                  }}
                />
                <Image
                  priority
                  src={faces[question.answer - 1].icon}
                  alt={"icon"}
                  width={18}
                  height={18}
                />
              </Stack>
            )}
          </>
        );

      default:
        break;
    }
  };

  return (
    <Stack>
      <Typography
        dangerouslySetInnerHTML={{
          __html: question.question,
        }}
        sx={{
          fontSize: "0.75rem",
          fontWeight: "600",
          color: "var(--text-primary)",
          span: { "&.blue-color": { color: "var(--primary)" } },
        }}
      />
      {question.description && (
        <TextXs
          text={question.description}
          sx={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
        />
      )}
      {viewModelQuestions()}
    </Stack>
  );
};

export default ViewModalQuestions;
