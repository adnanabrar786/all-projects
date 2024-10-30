import { toast } from "react-toastify";

export enum Header {
  TEXT = "TEXT",
}

export enum Dashboard {
  DASHBOARD = "dashboard",
  PROFILE = "profile",
  SAVEPROMPT = "save-prompt",
  SUBSCRIPTION = "SUBSCRIPTION",
}

export const errorMessage = (message: string) => {
  toast.error(message);
};

export const successMessage = (message: string) => {
  toast.success(message);
};

export const infoMessage = (message: string) => {
  toast.info(message);
};
