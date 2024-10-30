import { Stack, SxProps } from "@mui/material";
import TextLg from "components/common/Text/TextLg";
import TextXs from "components/common/Text/TextXs";

interface Props {
  text: string;
  subText: string;
  sx?: SxProps;
  sxTitle?: SxProps;
  sxSubTitle?: SxProps;
}

const ScoreCard = ({ sx, text, subText, sxTitle, sxSubTitle }: Props) => {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem 1.5rem",
        borderRadius: "0.5rem",
        gap: "0.125rem",
        ...sx,
      }}
    >
      <TextLg
        text={text}
        sx={{
          fontSize: "4.5rem",
          fontWeight: "600",
          lineHeight: "5.625rem",
          letterSpacing: "-0.09rem",
          ...sxTitle,
        }}
      />
      <TextXs
        text={subText}
        sx={{
          fontSize: "0.75rem",
          fontWeight: "500",
          lineHeight: "1.125rem",
          ...sxSubTitle,
        }}
      />
    </Stack>
  );
};

export default ScoreCard;
