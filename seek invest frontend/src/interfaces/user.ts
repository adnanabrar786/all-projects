import { IClient } from "interfaces/client";

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  phone: string;
  profile_image?: string;
  profile?: string;
  role: string;
  onboarding_complete: boolean;
  job_designation: string;
}

export interface IUserFormValues {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  job_designation: string;
}

export interface INewClientFormValues {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export interface IBilling {
  monthly: { id: string; amount: number };
  yearly: { id: string; amount: number };
}

export interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  selectedClients: IClient[] | null;
  setSelectedClients: (selectedClients: any) => void;
  selectedClient: IClient | null;
  setSelectedClient: (selectedClient: any) => void;
  valuesRisk: string;
  setValuesRisk: (value: string) => void;
  refreshOverallRiskAlignment: boolean;
  setRefreshOverallRiskAlignment: (value: boolean) => void;
}
