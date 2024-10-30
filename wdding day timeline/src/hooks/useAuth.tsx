import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export default function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<any>();
  const [unauthenticated, setUnauthenticated] = useState(false);

  const checkAuthState = useCallback(async () => {
    setIsLoading(false);
    try {
      const [user] = await Promise.all([Auth.currentAuthenticatedUser(), Auth.currentSession()]);
      if (user) {
        setUnauthenticated(false);
        setUserDetails(user);
        router.push(router.asPath);
        return;
      }
    } catch (error) {
      setUnauthenticated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  return { isLoading, unauthenticated, userDetails };
}
