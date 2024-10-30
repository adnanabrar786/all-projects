import { ListItemButton, SxProps } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import Image from "next/image";
import React, { ReactNode } from "react";

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  text: string;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  sx?: SxProps;
  sxTitle?: SxProps;
  disabled?: boolean;
  endIcon?: ReactNode;
}

const ListButton = ({
  onClick,
  text,
  icon,
  iconWidth = 20,
  iconHeight = 20,
  sx,
  sxTitle,
  disabled,
  endIcon,
}: Props) => {
  return (
    <ListItemButton
      disabled={disabled}
      onClick={onClick}
      sx={{ padding: "0.625rem 0.875rem", gap: "0.5rem", ...sx }}
    >
      {icon && (
        <Image
          priority
          src={icon}
          alt={"icon"}
          width={iconWidth}
          height={iconHeight}
        />
      )}
      <TextXs text={text} sx={{ fontWeight: "500", ...sxTitle }} />
      {endIcon}
    </ListItemButton>
  );
};

export default ListButton;
