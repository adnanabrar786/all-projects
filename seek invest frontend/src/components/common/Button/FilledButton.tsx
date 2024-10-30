import { Button, SxProps } from "@mui/material";
import { LoadingDarkIcon, LoadingIcon } from "constants/images.routes";
import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  secondary?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps;
  disabled?: boolean;
  loading?: boolean;
  disableRipple?: boolean;
}

const FilledButton = ({
  text,
  onClick,
  type,
  secondary,
  startIcon,
  endIcon,
  sx,
  disabled,
  loading,
  disableRipple,
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
    <Button
      disableElevation
      disableRipple={disableRipple}
      disabled={disabled}
      type={type}
      variant={"contained"}
      startIcon={
        loading ? (
          <Image
            className={"rotating"}
            priority
            src={secondary ? LoadingDarkIcon : LoadingIcon}
            alt={"icon"}
            width={21}
            height={20}
          />
        ) : (
          startIcon
        )
      }
      endIcon={endIcon}
      onClick={onClick}
      sx={{
        padding: "0.625rem 1rem",
        borderRadius: "0.5rem",
        fontSize: "0.8125rem",
        fontWeight: "500",
        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        border: border,
        color: color,
        background: bg,
        height: "2.5rem",
        ":hover": {
          color: color,
          background: bg,
        },
        "&.Mui-disabled": !secondary
          ? {
              borderColor: "var(--primary-disable)",
              backgroundColor: "var(--primary-disable)",
              color: "white",
            }
          : {
              borderColor: "var(--gray-200)",
              backgroundColor: "white",
              color: "var(--gray-300)",
            },
        ...sx,
      }}
    >
      {text}
    </Button>
  );
};

export default FilledButton;
