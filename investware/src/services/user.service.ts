import { USER_PROFILE } from '@/constants/api';
import { IEditUser, IUser } from '@/interfaces/IUser';
import { makeApiRequest } from './Verbs';

export const getUser = async () => {
  return makeApiRequest<{ data: IUser }>({
    method: 'get',
    url: USER_PROFILE,
  });
};

export const EditUser = async ({ first_name, last_name, company_name }: IEditUser) => {
  return makeApiRequest({
    method: 'put',
    url: USER_PROFILE,
    data: {
      first_name,
      last_name,
      company_name,
    },
  });
};
