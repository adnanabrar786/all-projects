"use client";

import { poppins } from "@/components/ThemeRegistry/theme";
import { Colors } from "@/utils/enums/colors";
import { Button } from "@mui/material";
import { MouseEventHandler } from "react";

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const MobileLoginButton = ({ onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        display: { md: "none" },
        width: "6rem",
        height: "2.2rem",
        fontFamily: poppins.style.fontFamily,
        fontSize: "1rem",
        fontWeight: "600",
        borderRadius: "0.4375rem",
        border: `0.13rem solid ${Colors.ZOMP}`,

        ":hover": {
          border: `0.13rem solid ${Colors.ZOMP}`,
        },
      }}
    >
      Login
    </Button>
  );
};

export default MobileLoginButton;
