import { IUser, IUserContext } from '@/interfaces/IUser';
import { ReactNode, useState } from 'react';
import UserContext from './UserContext';

interface Props {
  children: ReactNode;
}

const UserState = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [totalMultiValueCount, setTotalMultiValueCount] = useState<number>(0);

  const state: IUserContext = {
    user,
    setUser,
    totalMultiValueCount,
    setTotalMultiValueCount,
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export default UserState;
