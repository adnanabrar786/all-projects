import { SxProps, Typography } from "@mui/material";

interface Props {
  text: string;
  sx?: SxProps;
  noWrap?: boolean;
}

const TextXs = ({ text, sx, noWrap }: Props) => {
  return (
    <Typography
      noWrap={noWrap}
      sx={{
        fontSize: "0.875rem",
        fontWeight: "400",
        fontStyle: "normal",
        color: "var(--text-primary)",
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
};

export default TextXs;
