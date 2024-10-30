import Toast, { toastTypes } from "@/components/Toast/toast";

export const toastError = (description: string) => {
  return Toast({ type: toastTypes.error, description });
};
export const toastSuccess = (description: string) => {
  return Toast({ type: toastTypes.success, description });
};
