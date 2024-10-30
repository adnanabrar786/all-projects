import { Stack } from "@mui/material";
import { LoadingDarkIcon } from "constants/images.routes";
import Image from "next/image";

export default function LayoutLoader() {
  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        className={"rotating"}
        priority
        src={LoadingDarkIcon}
        alt={"icon"}
        width={120}
        height={120}
      />
    </Stack>
  );
}
