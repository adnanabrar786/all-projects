import { Stack } from "@mui/material";
import { LoadingDarkIcon } from "constants/images.routes";
import Image from "next/image";

const DialogLoader = () => {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "5rem",
      }}
    >
      <Image
        className={"rotating"}
        priority
        src={LoadingDarkIcon}
        alt={"icon"}
        width={50}
        height={50}
      />
    </Stack>
  );
};

export default DialogLoader;
