import { Stack, SxProps } from "@mui/material";
import IconText from "components/common/IconText";
import TextSm from "components/common/Text/TextSm";
import TextXs from "components/common/Text/TextXs";
import { CheckGrey400Icon, CrossGrey500Icon } from "constants/images.routes";
import { EAgreeDisagree } from "enums/enums";

const { AGREE, DISAGREE } = EAgreeDisagree;

interface Props {
  question: string;
  sx?: SxProps;
  agreeOrDisagree: string;
  onClick: (agreeOrDisagree: string) => void;
  description?: string;
}
export default function AgreeOrDisagreeQuestion({
  question,
  sx,
  agreeOrDisagree,
  description,
  onClick,
}: Props) {
  return (
    <>
      <TextSm text={question} sx={{ fontWeight: "700", ...sx }} />
      {description && (
        <TextXs text={description} sx={{ color: "var(--text-secondary)" }} />
      )}

      <Stack
        direction={"row"}
        sx={{
          mt: "1rem",
          backgroundColor: "white",
          width: "fit-content",
          borderRadius: "0.5rem",
          border: "1px solid var(--gray-300)",
          cursor: "pointer",
        }}
      >
        <IconText
          onClick={() => onClick(AGREE)}
          text="Agree"
          sxRow={{
            padding: "0.5rem 1.5rem",
            borderRight: "1px solid var(--gray-300)",
            borderRadius: "0.5rem 0 0 0.5rem",
            backgroundColor:
              agreeOrDisagree === AGREE ? "var(--gray-100)" : "transparent",
          }}
          icon={CheckGrey400Icon}
          iconWidth={20}
          iconHeight={20}
        />

        <IconText
          onClick={() => onClick(DISAGREE)}
          text="Disagree"
          sxRow={{
            padding: "0.5rem 1.5rem",
            borderRadius: "0 0.5rem 0.5rem 0",
            backgroundColor:
              agreeOrDisagree === DISAGREE ? "var(--gray-100)" : "transparent",
          }}
          icon={CrossGrey500Icon}
          iconWidth={20}
          iconHeight={20}
        />
      </Stack>
    </>
  );
}
