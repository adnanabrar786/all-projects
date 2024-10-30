export interface IAPIRequest {
  method: string;
  url: string;
  data?: object;
  headers?: object;
  formData?: boolean;
  uploadProgress?: object;
  timeout?: number;
}
