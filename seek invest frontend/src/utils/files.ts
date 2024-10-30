import download from "downloadjs";

export const formatFileSize = (sizeInBytes: number) => {
  const units = ["B", "KB", "MB", "GB", "TB"];

  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  const formattedSize =
    size % 1 === 0 ? size : size.toFixed(2).replace(/\.?0+$/, "");

  return `${formattedSize} ${units[unitIndex]}`;
};

export const handleDownloadFile = async (url, fileName) => {
  const res = await fetch(url);
  const blob = await res.blob();
  download(blob, fileName);
};
