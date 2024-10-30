import { PutResult, StorageAccessLevel } from "@aws-amplify/storage";
import { Storage } from "aws-amplify";

export const createFileObjectURL = (file: File): string => {
  return URL.createObjectURL(file);
};

export const getImageKey = async (img: string) => {
  return Storage.get(img);
};

export const UploadAsset = async (
  path: string,
  level: StorageAccessLevel,
  document: string | File,
): Promise<PutResult> => {
  let url = "";

  if (typeof document !== "string") {
    url = createFileObjectURL(document);
  } else {
    url = document;
  }

  const file = await (await fetch(url)).blob();

  return await Storage.put(path, file, { level: level });
};

export const GetAsset = async (
  path: string,
  level: StorageAccessLevel,
  identityId?: string,
): Promise<string> => {
  return Storage.get(path, {
    level: level,
    identityId,
  });
};

export const CreateImagePath = (id: string): string => "users/" + id;

export const CreateImagePathVendor = (
  id: string,
  type: string,
  key: string,
): string => "vendors/" + id + `/${type}` + `/${key}`;
export const CreateImagePathGuest = (
  id: string,
  type: string,
  key: string,
): string => "guests/" + id + `/${type}` + `/${key}`;
