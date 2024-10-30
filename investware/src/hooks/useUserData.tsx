import { useUserContext } from '@/context/user/UserContext';
import { getUser } from '@/services/user.service';
import { getToken } from '@/utils/token';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const useUserData = () => {
  const { user, setUser } = useUserContext();

  const {
    data: userData,
    error,
    isError,
    fetchStatus,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['get-profile'],
    queryFn: getUser,
    enabled: getToken() ? true : false,
    retry: 1,
  });

  useEffect(() => {
    if (userData?.data?.data) {
      setUser(userData?.data?.data);
    }
  }, [setUser, userData]);

  return { user, refetchUser: refetch };
};

export default useUserData;
