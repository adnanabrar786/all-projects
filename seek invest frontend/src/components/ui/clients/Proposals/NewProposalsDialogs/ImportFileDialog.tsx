import { Drawer, Stack, Typography } from "@mui/material";
import SaveAndCancelButton from "components/common/Button/SaveAndCancelButton";
import TextButton from "components/common/Button/TextButton";
import UploadFilledButton from "components/common/Button/UploadFilledButton";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import { ChangeEvent, useState } from "react";

interface Props {
  open: boolean;
  setOpen: (open: string | boolean) => void;
}

const ImportFileDialog = ({ open, setOpen }: Props) => {
  const [importFile, setImportFile] = useState<string>("");

  const onLoadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImportFile(URL.createObjectURL(file));
    }
    event.target.value = "";
  };

  return (
    <Drawer anchor={"right"} open={open}>
      <Stack sx={{ padding: "2rem", gap: "1rem", maxWidth: "789px" }}>
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <TextMd
            text="Import File"
            sx={{ lineHeight: "1.75rem", fontWeight: "700" }}
          />

          <TextButton
            onClick={() => setOpen(false)}
            text="Cancel"
            sx={{ color: "var(--text-secondary)" }}
          />
        </Stack>
        <Stack
          sx={{
            border: "1px dotted var(--gray-300)",
            borderRadius: "0.5rem",
            padding: "4.4375rem",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <TextXs
            text="Drag and drop or select file to import"
            sx={{ color: "var(--black)" }}
          />

          <UploadFilledButton
            secondary
            text={"Select file"}
            onClick={() => {}}
            sx={{ height: "2.5rem" }}
          >
            <input
              multiple
              hidden
              accept="image/*"
              type="file"
              onClick={(e: any) => {
                e.target.value = null;
              }}
              onChange={onLoadFile}
            />
          </UploadFilledButton>

          <TextXs
            text="CSV, XLS, OR XLSX"
            sx={{ color: "var(--text-secondary)" }}
          />
        </Stack>

        <Stack direction={"row"} sx={{ alignItems: "start", gap: "3.12rem" }}>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              fontSize: "0.75rem",
              span: { color: "var(--primary)" },
            }}
          >
            Download a <span>sample csv file</span> or{" "}
            <span>sample xls file</span> and compare it to your import file to
            ensure you have the file perfect for the import.
          </Typography>

          <SaveAndCancelButton
            save="Import"
            sx={{ flexDirection: "row-reverse" }}
          />
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default ImportFileDialog;
