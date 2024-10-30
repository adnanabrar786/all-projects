import { SxProps, Typography } from "@mui/material";

interface Props {
  text: string;
  noWrap?: boolean;
  sx?: SxProps;
}

const TextMd = ({ text, sx, noWrap }: Props) => {
  return (
    <Typography
      noWrap={noWrap}
      sx={{
        fontSize: "1.125rem",
        fontWeight: "600",
        fontStyle: "normal",
        color: "var(--text-primary)",
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
};

export default TextMd;
