import { Stack, Typography } from "@mui/material";
import IconText from "components/common/IconText";
import TextXs from "components/common/Text/TextXs";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  question: string;
  questionSubText: string;
  icon: string;
  iconText: string;
}

const QuestionCard = ({
  children,
  question,
  questionSubText,
  icon,
  iconText,
}: Props) => {
  return (
    <Stack
      sx={{
        border: "1px solid var(--border-color)",
        padding: "2.5rem 1.69rem",
        borderRadius: " 0.5rem",
      }}
    >
      <Typography
        dangerouslySetInnerHTML={{
          __html: question,
        }}
        sx={{
          fontWeight: "700",
          color: "var(--text-primary)",
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
          span: { "&.blue-color": { color: "var(--primary)" } },
        }}
      />

      <Stack
        direction={"row"}
        sx={{ gap: "1rem", alignItems: "center", pt: "0.5rem" }}
      >
        <IconText
          icon={icon}
          iconWidth={22}
          iconHeight={14}
          text={iconText}
          bg
        />

        <TextXs
          text={questionSubText}
          sx={{ color: "var(--text-secondary)" }}
        />
      </Stack>

      {children}
    </Stack>
  );
};

export default QuestionCard;
