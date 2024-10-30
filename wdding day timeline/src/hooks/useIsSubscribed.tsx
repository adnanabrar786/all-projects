import { SubscriptionType, Users } from '@prisma/client';
import { Auth } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';
import { useUserInfo } from 'state/useUser';

export default function useIsSubscribed() {
  const [user, setUser] = useState<Users>();
  const [subscribed, setSubscribed] = useState<boolean>(true);
  const { userInfo, isInit } = useUserInfo();
  const checkUserStatus = useCallback(async () => {
    const token = await Auth.currentSession();
    if (!token) return;

    if (!userInfo) return;

    const status = userInfo.subscrpition_type;
    setUser(userInfo);
    setSubscribed(status === SubscriptionType.FREEMIUM ? false : true);
  }, [userInfo, isInit]);

  useEffect(() => {
    if (!isInit && userInfo && userInfo.id) checkUserStatus();
  }, [isInit, userInfo]);

  return {
    user,
    subscribed,
  };
}
