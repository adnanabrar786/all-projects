export interface IAPIRequest {
  method: string;
  url: string;
  data?: object;
  headers?: object;
  formData?: boolean;
  serverToken?: string;
  uploadProgress?: object;
}
export interface IContactus {
  first_name: string;
  last_name: string | null;
  phone_no: string | null;
  email: string;
  country: string | null;
  message: string;
  company_name: string;
}
export interface ISubscriber {
  email: string;
}
export interface ICategoryProducts {
  category_filter_option: any;
  allItemsData: any;
}
export interface IProductDetail {
  product: any;
}
