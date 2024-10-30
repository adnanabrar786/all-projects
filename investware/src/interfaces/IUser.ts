export interface IUser {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  status: string;
}

export interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  totalMultiValueCount: number;
  setTotalMultiValueCount: (totalMultiValueCount: number) => void;
}

export interface IEditUser {
  first_name: string | undefined;
  last_name: string | undefined;
  company_name: string | undefined;
}

export interface IChangePassword {
  old_password?: string;
  new_password?: string;
  confirm_password?: string;
}
