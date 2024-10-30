import { useMutation } from "@tanstack/react-query";
import DrawerFileData from "components/ui/UploadFileDrawerLayout/DrawerFileData";
import SelectedFile from "components/ui/UploadFileDrawerLayout/SelectedFile";
import UploadFile from "components/ui/UploadFileDrawerLayout/UploadFile";
import { IBulkConfirm } from "interfaces/client";
import { useState } from "react";
import { clientsBulkConfirm } from "services/client.services";
import { formatFileSize } from "utils/files";
import { toastError } from "utils/toaster";

interface Props {
  setOpenFileDialog: (openFileDialog: boolean) => void;
}

const UploadFileDrawer = ({ setOpenFileDialog }: Props) => {
  const [importFile, setImportFile] = useState<File | null>(null);
  const [progressBar, setProgressBar] = useState(0);
  const [columns, setColumns] = useState<IBulkConfirm[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);

  const onLoadFile = async (fileList: FileList) => {
    const file = fileList ? fileList[0] : null;
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
      setImportFile(file);
      mutation.mutate();
    }
  };

  const mutation = useMutation({
    mutationFn: () => clientsBulkConfirm(importFile, setProgressBar),
    onSuccess: async ({ data }) => {
      setColumns(data.data);
    },
    onError: (err: { message: string }) => {
      setProgressBar(0);
      setImportFile(null);
      setColumns([]);
      if (err && err.message) {
        return toastError(err.message);
      }
      toastError("File Upload Error");
    },
  });

  return (
    <>
      {importFile ? (
        <>
          <UploadFile
            setImportFile={setImportFile}
            setProgressBar={setProgressBar}
            progressValue={progressBar}
            fileName={fileName}
            fileSize={formatFileSize(fileSize)}
            setColumns={setColumns}
          />

          {progressBar === 100 && columns.length > 0 ? (
            <DrawerFileData
              setOpenFileDialog={setOpenFileDialog}
              columns={columns}
              importFile={importFile}
              setImportFile={setImportFile}
              setProgressBar={setProgressBar}
              fetched=""
            />
          ) : null}
        </>
      ) : (
        <SelectedFile onLoadFile={onLoadFile} />
      )}
    </>
  );
};

export default UploadFileDrawer;
