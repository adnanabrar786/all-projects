import { Stack, SxProps } from "@mui/material";
import Image from "next/image";

interface Props {
  icon: string;
  iconWidth: number;
  iconHeight: number;
  sx?: SxProps;
}

const BgIcon = ({ icon, iconHeight, iconWidth, sx }: Props) => {
  return (
    <Stack
      sx={{
        borderRadius: "0.25rem",
        padding: "0.24rem",
        height: "fit-content",
        ...sx,
      }}
    >
      <Image
        priority
        src={icon}
        alt={"icon"}
        width={iconWidth}
        height={iconHeight}
      />
    </Stack>
  );
};

export default BgIcon;
