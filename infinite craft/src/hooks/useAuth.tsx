"use client";

import { GetUserProfile } from "@/services/user.service";
import { setUserDetails } from "@/store/slices/authSlice";
import { Auth, Hub } from "aws-amplify";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [unauthenticated, setUnauthenticated] = useState(false);
  const dispatch = useDispatch();

  const checkAuthState = useCallback(async () => {
    setIsLoading(false);
    try {
      const [user] = await Promise.all([
        Auth.currentAuthenticatedUser(),
        Auth.currentSession(),
      ]);

      if (user) {
        const { data }: any = await GetUserProfile(
          user.signInUserSession.accessToken.jwtToken,
        );

        dispatch(
          setUserDetails({
            id: user.attributes.sub,
            email: user.attributes.email,
            key: null,
            isLogin: true,
            given_name: data?.data?.first_name,
            family_name: data?.data?.last_name,
            token: user.signInUserSession.accessToken.jwtToken,
            subscription: data?.data?.user_subscription_type,
            image: data?.data?.user_image,
            user_count: data?.data?.user_count,
          }),
        );
        setUnauthenticated(false);
        // router.push(router.asPath);
        return;
      }
    } catch (error) {
      setUnauthenticated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkAuthState();
    Hub.listen("auth", async (data) => {
      if (data.payload.event === "signIn") {
        const user = data.payload.data;

        if (user) {
          const { data }: any = await GetUserProfile(
            user.signInUserSession.accessToken.jwtToken,
          );
          setUserDetails({
            id: user.attributes.sub,
            email: user.attributes.email,
            key: null,
            isLogin: true,
            token: user.signInUserSession.accessToken.jwtToken,
            subscription: data?.data?.user_subscription_type,
            image: data?.data?.user_image,
            user_count: data?.data?.user_count,
          });
        }
      }

      if (data.payload.event === "signOut") {
        dispatch(
          setUserDetails({
            id: null,
            email: null,
            key: null,
            isLogin: false,
            token: null,
            subscription: "",
            image: "",
          }),
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAuthState, dispatch]);

  return { isLoading, unauthenticated };
}
