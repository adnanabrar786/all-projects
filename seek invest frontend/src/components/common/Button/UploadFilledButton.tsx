import { Button, SxProps } from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  secondary?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  sx?: SxProps;
  children?: ReactNode;
}

const UploadFilledButton = ({
  text,
  onClick,
  secondary,
  startIcon,
  sx,
  children,
  disabled,
}: Props) => {
  const border = secondary
    ? "1px solid var(--gray-300, #D0D5DD)"
    : "1px solid var(--primary-600, #1A3ED2)";

  const color = secondary
    ? "var(--color-text-text, #344054)"
    : "var(--base-white, #FFF)";

  const bg = secondary
    ? "var(--base-white, #FFF)"
    : "var(--primary-600, #1A3ED2)";

  return (
    //@ts-ignore
    <Button
      disabled={disabled}
      component="label"
      disableElevation
      variant={"contained"}
      startIcon={startIcon}
      onClick={onClick}
      sx={{
        padding: "0.625rem 1rem",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        fontWeight: "500",
        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        border: border,
        color: color,
        background: bg,
        ":hover": {
          color: color,
          background: bg,
        },
        "&.Mui-disabled": {
          borderColor: "var(--gray-200)",
          backgroundColor: "white",
          color: "var(--gray-300)",
        },
        ...sx,
      }}
    >
      {children}
      {text}
    </Button>
  );
};

export default UploadFilledButton;
