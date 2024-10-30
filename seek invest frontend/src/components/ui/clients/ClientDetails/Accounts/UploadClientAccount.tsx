import { useMutation } from "@tanstack/react-query";
import DrawerFileData from "components/ui/UploadFileDrawerLayout/DrawerFileData";
import SelectedFile from "components/ui/UploadFileDrawerLayout/SelectedFile";
import UploadFile from "components/ui/UploadFileDrawerLayout/UploadFile";
import { useModelContext } from "context/model/ModelContext";
import { MODEL_PORTFOLIO } from "enums/enums";
import { IBulkConfirm } from "interfaces/client";
import { useState } from "react";
import { accountsBulkConfirm } from "services/accounts.services";
import { modelBulkReview } from "services/model.services";
import { formatFileSize } from "utils/files";
import { toastError } from "utils/toaster";

interface Props {
  setOpenFileDialog: (openFileDialog: boolean) => void;
  fetched: string;
  setCsvError?: (value: string) => void;
  setCsvInfo?: (value: string) => void;
}

const UploadClientAccount = ({
  setOpenFileDialog,
  fetched,
  setCsvError,
  setCsvInfo,
}: Props) => {
  const [importFile, setImportFile] = useState<File | null>(null);
  const [progressBar, setProgressBar] = useState(0);
  const [columns, setColumns] = useState<IBulkConfirm[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const { reviewModels, setReviewModels } = useModelContext();

  const onLoadFile = async (fileList: FileList) => {
    const file = fileList ? fileList[0] : null;
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
      setImportFile(file);
      mutation.mutate();
      if (setCsvError) {
        setCsvError("");
      }
      if (setCsvInfo) {
        setCsvInfo("");
      }
    }
  };

  const mutation = useMutation({
    mutationFn: () => {
      return accountsBulkConfirm(importFile, setProgressBar);
    },
    onSuccess: async ({ data }) => {
      if (fetched === MODEL_PORTFOLIO) {
        const bulkReviewRes = await modelBulkReview(importFile);

        if (bulkReviewRes && bulkReviewRes.data && setCsvInfo) {
          setReviewModels(bulkReviewRes.data.data.models);
          const percentageWarning =
            bulkReviewRes.data.data.show_percentage_warning;
          if (percentageWarning) {
            setCsvInfo(
              "Total percentage values in one or more models are incomplete. You can manually input percentage values for incomplete models by selecting Import or select Cancel to cancel the import and update your file."
            );
          } else {
            setCsvInfo("");
          }
        }
      }

      setColumns(data.data);
    },
    onError: (err: { message: string }) => {
      setProgressBar(0);
      setImportFile(null);
      setColumns([]);
      if (err && err.message) {
        if (setCsvError) {
          return setCsvError(err.message);
        }
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
            setCsvInfo={setCsvInfo}
          />

          {progressBar === 100 && columns.length > 0 ? (
            <DrawerFileData
              setOpenFileDialog={setOpenFileDialog}
              columns={columns}
              importFile={importFile}
              setImportFile={setImportFile}
              setProgressBar={setProgressBar}
              fetched={fetched}
              setCsvInfo={setCsvInfo}
            />
          ) : null}
        </>
      ) : (
        <SelectedFile onLoadFile={onLoadFile} />
      )}
    </>
  );
};

export default UploadClientAccount;
