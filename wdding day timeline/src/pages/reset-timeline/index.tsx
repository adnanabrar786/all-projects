import useAuth from 'hooks/useAuth';
import { LOGIN_URL } from 'routes';
import { useRouter } from 'next/router';
import { AppLoader } from 'components/common/AppLoader';
import { ResetTimelineLayout } from 'components/common/NewOnbordingComponents/ResetTimelineLayout';
import { clearOnboardingAndResetTimelineData } from 'utils/localStorage';
import { useEffect } from 'react';

export default function Page() {
  const { isLoading, unauthenticated } = useAuth();
  const router = useRouter();

  if (unauthenticated) {
    router.replace(LOGIN_URL);
    return <></>;
  }

  useEffect(() => {
    clearOnboardingAndResetTimelineData();
  }, []);

  return <>{isLoading ? <AppLoader /> : <ResetTimelineLayout />}</>;
}
