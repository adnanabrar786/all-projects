import { Dialog } from "@mui/material";
import { CrossGrey500Icon } from "constants/images.routes";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean | string) => void;
  children: ReactNode;
}

const LargeDialog = ({ open, setOpen, children }: Props) => {
  return (
    <Dialog
      open={open}
      fullWidth
      PaperProps={{
        sx: {
          maxWidth: "800px",
          borderRadius: "1rem",
          ".closeIcon": {
            position: "absolute",
            right: "2.41rem",
            top: "1.87rem",
            cursor: "pointer",
          },
        },
      }}
    >
      <Image
        onClick={() => setOpen("")}
        className="closeIcon"
        priority
        src={CrossGrey500Icon}
        alt={"icon"}
        width={25}
        height={25}
      />

      {children}
    </Dialog>
  );
};

export default LargeDialog;
