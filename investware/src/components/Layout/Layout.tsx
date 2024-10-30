import { AppLoader } from '@/components/common/AppLoader';
import {
  EMAIL_VERIFICATION,
  EMAIL_VERIFIED,
  FORGET_PASSWORD,
  LOGIN,
  RESET_PASSWORD,
  ROOT_PAGE,
  SIGN_UP,
  TRADE,
} from '@/constants/routes/pages.routes';
import { useUserContext } from '@/context/user/UserContext';
import { Stack } from '@mui/material';
import { QueryClient } from '@tanstack/react-query';
import { Auth } from 'aws-amplify';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Layout = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user: contextUser } = useUserContext();

  const pathName = usePathname();
  const router = useRouter();
  const AUTH_ROUTES = [LOGIN, SIGN_UP, FORGET_PASSWORD, EMAIL_VERIFICATION, RESET_PASSWORD, EMAIL_VERIFIED];

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        if (!AUTH_ROUTES.some((route) => pathName.includes(route))) {
          return router.replace(LOGIN);
        }
      } else {
        if (AUTH_ROUTES.some((route) => pathName.includes(route)) || pathName === ROOT_PAGE) {
          return router.replace(TRADE);
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, [AUTH_ROUTES, pathName, router]);

  const setUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    if (user && user.signInUserSession.accessToken.jwtToken) {
      localStorage.setItem('token', user.signInUserSession.accessToken.jwtToken);
    }
  };

  useEffect(() => {
    if (!contextUser) {
      setUserData();
      queryClient.invalidateQueries({ queryKey: ['get-profile'] });
    }
  }, [contextUser]);

  useEffect(() => {
    const refreshInterval = setInterval(
      async () => {
        try {
          const session = await Auth.currentSession();
          const newToken = session.getAccessToken().getJwtToken();
          localStorage.setItem('token', newToken);
        } catch (error) {
          console.error('Token refresh failed', error);
        }
      },
      40 * 60 * 1000,
    );

    return () => clearInterval(refreshInterval);
  }, []);

  if (isLoading)
    return (
      <Stack
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <AppLoader size={50} color="var(--sky-blue)" />
      </Stack>
    );

  return <>{children}</>;
};

export default Layout;
