import { Button, SxProps } from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps;
  disabled?: boolean;
  disableRipple?: boolean;
}

const TextButton = ({
  text,
  onClick,
  type,
  startIcon,
  endIcon,
  sx,
  disabled,
  disableRipple,
}: Props) => {
  return (
    <Button
      disabled={disabled}
      disableElevation
      disableRipple={disableRipple}
      type={type}
      variant={"text"}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      sx={{
        fontSize: "0.8125rem",
        fontWeight: "500",
        color: "var(--text-primary)",
        ...sx,
      }}
    >
      {text}
    </Button>
  );
};

export default TextButton;
