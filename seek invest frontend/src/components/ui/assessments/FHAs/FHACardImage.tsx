import { Stack } from "@mui/material";
import { FHAFilledIconSmall, FolderIcon } from "constants/images.routes";
import Image from "next/image";

interface Props {
  folder?: boolean;
}

const FHACardImage = ({ folder = true }: Props) => {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        padding: "0.75rem",
        borderRadius: "0.5rem",
        backgroundColor: folder ? "var(--pink-dark)" : "var(--green-light)",
        img: {
          cursor: "pointer",
        },
      }}
    >
      <Image
        className="fha icon"
        priority
        src={folder ? FolderIcon : FHAFilledIconSmall}
        alt={"icon"}
        width={20}
        height={20}
      />
    </Stack>
  );
};

export default FHACardImage;
