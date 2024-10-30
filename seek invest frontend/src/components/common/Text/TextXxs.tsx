import { SxProps, Typography } from "@mui/material";
import { MouseEventHandler } from "react";

interface Props {
  text: string;
  sx?: SxProps;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  noWrap?: boolean;
}

const TextXxs = ({ text, sx, noWrap, onClick }: Props) => {
  return (
    <Typography
      onClick={onClick}
      noWrap={noWrap}
      sx={{
        fontSize: "0.75rem",
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

export default TextXxs;
