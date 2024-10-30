import { Stack, SxProps } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  text: string;
  icon?: string;
  activeIcon?: string;
  activeText?: boolean;
  disable?: boolean;
  sxText?: SxProps;
  sx?: SxProps;
  endIcon?: ReactNode;
}

const TabIconText = ({
  icon,
  activeIcon,
  text,
  activeText,
  sx,
  sxText,
  endIcon,
  disable,
}: Props) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        gap: "0.5rem",
        alignItems: "center",
        paddingBottom: "0.75rem",
        ...sx,
      }}
    >
      {icon && activeIcon && (
        <Image
          className="icon"
          priority
          src={activeText ? activeIcon : icon}
          alt={"icon"}
          width={16}
          height={16}
        />
      )}
      <TextXs
        text={text}
        sx={{
          fontWeight: "500",
          lineHeight: "1.25rem",
          color: activeText
            ? "var(--primary)"
            : disable
            ? "var(--gray-300)"
            : "var(--text-secondary)",
          ...sxText,
        }}
      />

      {endIcon}
    </Stack>
  );
};

export default TabIconText;
