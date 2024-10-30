export interface ICompany {
  name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  id: string;
  logo?: string;
  user_id: string;
  job_designation?: string;
}

interface ICompanyFormValues {
  name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zip: string;
  job_designation?: string;
}

export type ICompanyFormik = Pick<ICompany, keyof ICompanyFormValues>;

export interface ICompanyContext {
  company: ICompany | null;
  setCompany: (user: ICompany | null) => void;
}

export interface ICompanyMember {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface IMemberData {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
}
