import { Stack, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  sx?: SxProps;
}

const MenuCard = ({ children, sx }: Props) => {
  return (
    <Stack
      sx={{
        borderRadius: "0.5rem",
        border: "1px solid var(--gray-100)",
        background: "#fff",
        position: "absolute",
        zIndex: "1",
        top: "30px",
        right: 0,
        overflow: "hidden",
        boxShadow:
          "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};

export default MenuCard;
