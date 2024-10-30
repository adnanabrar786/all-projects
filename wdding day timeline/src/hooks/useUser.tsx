import { useCallback, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

export default function useUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);

  const checkAuthState = useCallback(async () => {
    try {
      const [user, token] = await Promise.all([Auth.currentAuthenticatedUser(), Auth.currentSession()]);
      if (user && token) {
        setLogin(true);
      }
    } catch (error) {
      setLogin(false);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  return { isLoading, isLogin };
}
