import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { USER_KEY } from "constants/react_query_keys";
import { useUserContext } from "context/user/UserContext";
import { CustomError } from "interfaces/assessment";
import { IUser } from "interfaces/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "services/user.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useUserData = (isTokenExpired?: boolean) => {
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const {
    data: userData,
    error,
    refetch,
  }: UseQueryResult<{ data: { data: IUser } }, CustomError> = useQuery({
    queryKey: [USER_KEY],
    queryFn: () => getUser(),
    enabled: getToken() && !isTokenExpired ? true : false,
    retry: 1,
    retryDelay: 30000,
  });

  useEffect(() => {
    if (userData?.data?.data) {
      setUser(userData?.data?.data);
    }
  }, [userData]);

  handleErrorPage(error, router);

  return { user, refetchUser: refetch };
};

export default useUserData;
