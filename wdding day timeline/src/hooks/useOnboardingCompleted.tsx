import { OnboardingType } from '@prisma/client';
import { Auth } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';
import { WeddingService } from 'services/wedding.service';

export default function useOnboardingCompleted() {
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(false);

  const checkUserOnboardingStatus = useCallback(async () => {
    const weddingService = new WeddingService();

    const token = await Auth.currentSession();
    if (token) {
      const res = await weddingService.GetWedding();
      if (res && res.data.data) {
        const status = res.data.data.onboarding_status;
        setOnboardingCompleted(status === OnboardingType.COMPLETED);
      } else setOnboardingCompleted(false);
    }
  }, []);

  useEffect(() => {
    checkUserOnboardingStatus();
  }, [checkUserOnboardingStatus]);

  return {
    onboardingCompleted,
  };
}
