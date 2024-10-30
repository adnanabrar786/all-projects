export interface IAPIRequest {
  method: string;
  url: string;
  data?: object;
  headers?: object;
  formData?: boolean;
  serverToken?: string;
  uploadProgress?: object;
  timeout?: number;
}
