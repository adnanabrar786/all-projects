import { Stack, SxProps } from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  sx?: SxProps;
}

const BorderCard = ({ children, sx, onClick }: Props) => {
  return (
    <Stack
      onClick={onClick}
      sx={{
        padding: "2rem",
        background: "white",
        border: "1px solid var(--color-border-border-subtle, #F2F4F7)",
        borderRadius: "1rem",
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};

export default BorderCard;
