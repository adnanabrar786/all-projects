import { IUserContext } from '@/interfaces/IUser';
import { createContext, useContext } from 'react';

const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  totalMultiValueCount: 0,
  setTotalMultiValueCount: () => {},
});

export const useUserContext = () => useContext(UserContext);

export default UserContext;
