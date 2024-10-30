import { CssBaseline, Stack } from "@mui/material";
import UploadFilledButton from "components/common/Button/UploadFilledButton";
import TextXs from "components/common/Text/TextXs";
import { Csv } from "constants/images.routes";
import Image from "next/image";
import { ChangeEvent, DragEvent, useState } from "react";

interface Props {
  onLoadFile: (files: FileList) => void;
}

const SelectedFile = ({ onLoadFile }: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;

    onLoadFile(files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      onLoadFile(e.target.files);
    }

    if (e.target) {
      e.target.value = "";
    }
  };

  return (
    <>
      <Stack
        sx={{
          border: `1px dashed ${
            isDragging ? "var(--primary-600)" : "var(--gray-300)"
          }`,
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          borderRadius: "0.5rem",
          gap: "0.5rem",
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <CssBaseline />
        <Image priority src={Csv} alt={"icon"} width={32} height={32} />
        <TextXs text="Drag and drop or select file to import" />
        <UploadFilledButton
          text="Select file"
          secondary
          onClick={() => {}}
          sx={{ height: "2.25rem" }}
        >
          <input
            multiple
            hidden
            accept=".csv"
            type="file"
            onClick={(e: any) => {
              e.target.value = null;
            }}
            onChange={handleSelectFile}
          />
        </UploadFilledButton>
      </Stack>
    </>
  );
};

export default SelectedFile;
