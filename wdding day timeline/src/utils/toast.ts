import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const successToast = (message: string, options?: ToastOptions) => {
  const combinedOptions = { ...defaultOptions, ...options };
  toast.success(message, combinedOptions);
};

export const errorToast = (message: string, options?: ToastOptions) => {
  const combinedOptions = { ...defaultOptions, ...options };
  toast.error(message, combinedOptions);
};

export const infoToast = (message: string, options?: ToastOptions) => {
  const combinedOptions = { ...defaultOptions, ...options };
  toast.info(message, combinedOptions);
};

export const warningToast = (message: string, options?: ToastOptions) => {
  const combinedOptions = { ...defaultOptions, ...options };
  toast.warn(message, combinedOptions);
};
