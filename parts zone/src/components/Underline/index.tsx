import { Stack, SxProps } from "@mui/system";
import Image from "next/image";

interface Props {
  sx: SxProps;
}

const Underline = ({ sx }: Props) => {
  return (
    <>
      <Stack
        sx={{
          ...sx,
        }}
      >
        <Image
          src={"/underline.svg"}
          priority
          quality={100}
          width={90}
          height={3}
          alt="arrow"
        />
      </Stack>
    </>
  );
};

export default Underline;
