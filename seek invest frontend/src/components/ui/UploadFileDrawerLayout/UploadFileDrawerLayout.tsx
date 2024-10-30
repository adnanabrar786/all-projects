import { Drawer, Stack } from "@mui/material";
import TextButton from "components/common/Button/TextButton";
import TextMd from "components/common/Text/TextMd";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  openFileDialog: boolean;
  setOpenFileDialog: (openFileDialog: boolean) => void;
  setCsvError?: (value: string) => void;
  setCsvInfo?: (value: string) => void;
}

const UploadFileDrawerLayout = ({
  children,
  openFileDialog,
  setOpenFileDialog,
  setCsvError,
  setCsvInfo,
}: Props) => {
  return (
    <>
      <Drawer
        anchor={"right"}
        open={openFileDialog}
        onClose={() => {
          setOpenFileDialog(false);
          if (setCsvError) {
            setCsvError("");
          }
          if (setCsvInfo) {
            setCsvInfo("");
          }
        }}
      >
        <Stack sx={{ padding: "2rem", gap: "1rem", width: "789px" }}>
          <Stack
            direction={"row"}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <TextMd
              text="Import Data"
              sx={{ lineHeight: "1.75rem", fontWeight: "700" }}
            />

            <TextButton
              onClick={() => {
                setOpenFileDialog(false);
                if (setCsvError) {
                  setCsvError("");
                }
                if (setCsvInfo) {
                  setCsvInfo("");
                }
              }}
              text="Close"
              sx={{ color: "var(--text-secondary)" }}
            />
          </Stack>

          {children}
        </Stack>
      </Drawer>
    </>
  );
};

export default UploadFileDrawerLayout;
