import { Stack } from '@mui/material';
import { SubscriptionType } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { AppLoader } from 'components/common/AppLoader';
import { USER_ID_KEY, USER_SUBSCRIPTION_TYPE_KEY } from 'constants/localStorage';
import useAuth from 'hooks/useAuth';
import { ICustomerPromotion } from 'interfaces/promotion.interface';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { LOGIN_URL, ROOT_URL } from 'routes';
import StripeService from 'services/stripe.service';
import Blog from './Blog';
import Feature from './Feature';
import FooterSale from './FooterSale';
import HeaderSale from './HeaderSale';
import Personalize from './Personalize';
import WeddingCard from './WeddingCard';
import WeddingPlan from './WeddingPlan';

const stripeService = new StripeService();

const Sale = () => {
  const router = useRouter();
  const [price, setPrice] = useState<string>('');
  const [userID, setUserID] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
  const [hours, setHours] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');
  const [promotionCode, setPromotionCodes] = useState<ICustomerPromotion | null>(null);
  const [checkoutLink, setCheckoutLink] = useState<string>('');
  const { isLoading, unauthenticated } = useAuth();
  const [isCheckOutLoading, setIsCheckOutLoading] = useState(false);

  const updateTimer = useCallback((expireAt: number) => {
    const targetDate = new Date(expireAt * 1000);
    const currentDate = new Date();
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const totalSeconds = Math.floor(timeDifference / 1000);

    const remainingHours = Math.floor(totalSeconds / 3600);
    const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = Math.floor(totalSeconds % 60);

    if (totalSeconds < 0) {
      setHours('00');
      setMinutes('00');
      setSeconds('00');
      getPromotionCodes.mutate();
      setPromotionCodes(null);
      return;
    }

    setHours(remainingHours.toString());
    setMinutes(remainingMinutes.toString());
    setSeconds(remainingSeconds.toString());
    setTimeout(() => {
      updateTimer(expireAt);
    }, 1000);
  }, []);

  const getPromotionCodes = useMutation(stripeService.GetPromotions, {
    onSuccess: ({ data }) => {
      if (!data) {
        return router.replace(ROOT_URL);
      }
      if (data.id) {
        setPromotionCodes(data);
        checkoutSession.mutate(data.id);
        return;
      }
      if (data.id === null) {
        setPromotionCodes(null);
        checkoutSession.mutate(null);
      }
    },
    onError(error: any) {
      const err: any = error;
      toast.error(err.message);
      return;
    },
  });

  const checkoutSession = useMutation(
    (promotionID: string | null) => stripeService.CreateCheckoutSession(userID, promotionID),
    {
      onSuccess: ({ data }) => {
        setCheckoutLink(data.data.url);
        setIsCheckOutLoading(false);
      },
      onError(error) {
        if (error) {
          toast.error('Internal Server Error');
          setIsCheckOutLoading(false);
        }
      },
    },
  );

  useEffect(() => {
    if (!isLoading) {
      const user = localStorage.getItem(USER_ID_KEY);
      const userSubscriptionType = localStorage.getItem(USER_SUBSCRIPTION_TYPE_KEY);
      if (unauthenticated && !user) {
        router.replace(LOGIN_URL);
        return;
      }

      if (userSubscriptionType === SubscriptionType.PREMIUM) {
        router.replace(ROOT_URL);
        return;
      }
      setUserID(`${user}`);
      getPromotionCodes.mutate();
    }
  }, [isLoading]);

  useEffect(() => {
    if (promotionCode && userID) {
      const now = Math.floor(Date.now() / 1000);
      const remainingSeconds = promotionCode?.expires_at - now;
      if (remainingSeconds <= 1200) {
        updateTimer(promotionCode?.expires_at);
        return;
      }
      if (remainingSeconds > 1200) {
        updateTimer(promotionCode?.expires_at);
        return;
      }
      setHours('00');
      setMinutes('00');
      setSeconds('00');
      getPromotionCodes.mutate();
    }
  }, [promotionCode, updateTimer]);

  useEffect(() => {
    if (promotionCode && promotionCode.id) {
      if (promotionCode.code === '50OFF') {
        setPrice('$39.95');
        return;
      }
      if (promotionCode.code === '33OFF') {
        setPrice('$49.95');
        return;
      }
    }

    setPrice('$79.95');
  }, [promotionCode]);

  const minutetime = `${minutes.padStart(2, '0')}` + `:${seconds.padStart(2, '0')}`;
  const time = hours !== '0' ? `${hours.padStart(2, '0')}` + `:${minutetime}` : minutetime;

  return (
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      {getPromotionCodes.isLoading && !checkoutLink && isLoading ? (
        <AppLoader />
      ) : (
        <>
          <HeaderSale
            promotionCode={promotionCode}
            text={time}
            checkoutLink={checkoutLink}
            isLoading={isCheckOutLoading}
            setIsLoading={setIsCheckOutLoading}
          />
          <WeddingCard />
          <Personalize
            text={time}
            checkoutLink={checkoutLink}
            promotionCode={promotionCode}
            isLoading={isCheckOutLoading}
            setIsLoading={setIsCheckOutLoading}
          />
          <WeddingPlan
            price={price}
            checkoutLink={checkoutLink}
            isLoading={isCheckOutLoading}
            setIsLoading={setIsCheckOutLoading}
          />
          <Blog
            price={price}
            checkoutLink={checkoutLink}
            isLoading={isCheckOutLoading}
            setIsLoading={setIsCheckOutLoading}
          />
          <Feature
            price={price}
            checkoutLink={checkoutLink}
            isLoading={isCheckOutLoading}
            setIsLoading={setIsCheckOutLoading}
          />
          <FooterSale />
        </>
      )}
    </Stack>
  );
};

export default Sale;
