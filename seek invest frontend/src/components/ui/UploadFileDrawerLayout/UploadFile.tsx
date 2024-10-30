import { Stack } from "@mui/material";
import CustomizedProgressBars from "components/common/Progress/Progress";
import TextXs from "components/common/Text/TextXs";
import { CrossGrey600Icon, Csv } from "constants/images.routes";
import { IBulkConfirm } from "interfaces/client";
import Image from "next/image";
interface Props {
  progressValue: number;
  setProgressBar: (progressValue: number) => void;
  setImportFile: (importFile: File | null) => void;
  fileName: string;
  fileSize: number | string;
  setColumns: (value: IBulkConfirm[]) => void;
  setCsvInfo?: (value: string) => void;
}

const UploadFile = ({
  progressValue,
  setProgressBar,
  setImportFile,
  fileName,
  fileSize,
  setColumns,
  setCsvInfo,
}: Props) => {
  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          backgroundColor: "var(--gray-100)",
          borderRadius: "0.5rem",
          padding: "1rem 2.12rem",
          gap: "0.5rem",
        }}
      >
        <Stack>
          <Image priority src={Csv} alt={"icon"} width={32} height={32} />
        </Stack>
        <Stack
          sx={{
            width: "100%",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              img: {
                cursor: "pointer",
              },
            }}
          >
            <TextXs
              sx={{
                lineHeight: "1.25rem",
                fontWeight: "600",
              }}
              text={fileName}
            />
            <Image
              onClick={() => {
                setProgressBar(0);
                setImportFile(null);
                setColumns([]);
                if (setCsvInfo) {
                  setCsvInfo("");
                }
              }}
              priority
              src={CrossGrey600Icon}
              alt={"icon"}
              width={16}
              height={16}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
            }}
          >
            <TextXs
              sx={{
                lineHeight: "1.25rem",
                fontWeight: "500",
                fontSize: "0.75rem",
              }}
              text={`${fileSize}`}
            />

            {progressValue === 100 ? null : (
              <TextXs
                sx={{
                  lineHeight: "1.25rem",
                  fontWeight: "500",
                  fontSize: "0.75rem",
                }}
                text={`${progressValue.toFixed(0)}%`}
              />
            )}
          </Stack>
          <Stack
            sx={{
              marginTop: "1rem",
            }}
          >
            {progressValue === 100 ? null : (
              <CustomizedProgressBars value={progressValue} />
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default UploadFile;
