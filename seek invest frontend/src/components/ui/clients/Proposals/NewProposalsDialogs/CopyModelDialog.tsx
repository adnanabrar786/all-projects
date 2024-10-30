import { Stack } from "@mui/material";
import SaveAndCancelButton from "components/common/Button/SaveAndCancelButton";
import LargeDialog from "components/common/Dialog/LargeDialog";
import SearchTextField from "components/common/Input/SearchTextField";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import { SearchOutlinedIcon } from "constants/images.routes";
import Image from "next/image";

interface Props {
  open: boolean;
  setOpen: (open: string | boolean) => void;
}

const CopyModelDialog = ({ open, setOpen }: Props) => {
  return (
    <LargeDialog open={open} setOpen={setOpen}>
      <Stack sx={{ padding: "6.19rem 7.84rem" }}>
        <TextMd text="Select Model Portfolio" sx={{ lineHeight: "1.875rem" }} />

        <TextXs
          text="Search for model portfolio"
          sx={{ color: "var(--black)", mt: "3.25rem" }}
        />
        <SearchTextField
          placeholder="Search model portfolio"
          onChange={() => {}}
          startIcon={
            <Image
              className="searchIcon"
              priority
              src={SearchOutlinedIcon}
              alt={"icon"}
              width={20}
              height={20}
            />
          }
        />

        <SaveAndCancelButton
          save="Copy"
          sx={{
            flexDirection: "row-reverse",
            alignSelf: "flex-start",
            mt: "2rem",
          }}
        />
      </Stack>
    </LargeDialog>
  );
};

export default CopyModelDialog;
