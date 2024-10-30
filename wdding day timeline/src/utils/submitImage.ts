import {
  createFileObjectURL,
  CreateImagePathGuest,
  CreateImagePathVendor,
  UploadAsset,
} from 'services/storage.service';
import { errorToast } from './toast';

export const submitImageVendor = async (file: File, user_name: string, file_name: string, folderType: string) => {
  try {
    if (file) {
      const imgFile = {
        url: createFileObjectURL(file),
      };

      const path = Date.now() + CreateImagePathVendor(user_name.replace(/\s{1,}/g, '_'), folderType, file_name);
      const result = await UploadAsset(path, 'public', imgFile.url);
      return 'public/' + result.key;
    }
    return false;
  } catch (ex) {
    errorToast('Something went wrong');
  }
};
export const submitImageGuest = async (file: File, userId: string, name: string, folderType: string) => {
  try {
    if (file) {
      const imgFile = {
        url: createFileObjectURL(file),
      };

      const path = Date.now() + CreateImagePathGuest(userId?.replaceAll(' ', '_'), folderType, name);

      const result = await UploadAsset(path, 'public', imgFile.url);
      return 'public/' + result.key;
    }
  } catch (ex) {
    errorToast('Something went wrong');
  }
};
