import { SxProps, Typography } from "@mui/material";

interface Props {
  text: string;
  sx?: SxProps;
}

const HintText = ({ text, sx }: Props) => {
  return (
    <Typography
      sx={{
        color: "var(--color-text-text-secondary, #667085)",
        fontSize: "0.8125rem",
        fontWeight: "400",
        lineHeight: "1.125rem",
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
};

export default HintText;
