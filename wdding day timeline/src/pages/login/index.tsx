import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { SubscriptionType, USER_VERSIONS } from '@prisma/client';
import { Auth } from 'aws-amplify';
import { AppLoader } from 'components/common/AppLoader';
import HTMLHeader from 'components/common/Head';
import InputField from 'components/common/InputField';
import Logo from 'components/common/Logo';
import { USER_EMAIL_KEY, USER_ID_KEY, USER_SUBSCRIPTION_TYPE_KEY, USER_VERSION_KEY } from 'constants/localStorage';
import { useFormik } from 'formik';
import useUser from 'hooks/useUser';
import { IAuthLoginForm } from 'interfaces/forms';
import LogRocket from 'logrocket';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  CHANGE_PASSWORD_URL,
  EMAIL_VERIFICATION_URL,
  FORGET_PASSWORD_URL,
  NEW_ONBOARDING_URL,
  ROOT_URL,
  SALE_URL,
} from 'routes';
import { SignIn } from 'services/auth.service';
import UserService from 'services/user.service';
import { useStoreCouple } from 'state/useCouple';
import { useStore } from 'state/useUser';
import { useStoreWedding } from 'state/useWedding';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { errorToast, infoToast } from 'utils/toast';
import { LOGIN_FORM_SCHEMA } from 'validators';

const userService = new UserService();

const Subscription_check_list = [SubscriptionType.TRIAL, SubscriptionType.PRO_YEARLY, SubscriptionType.PRO_MONTHLY];

export default function Page() {
  const router = useRouter();
  const { clearWedInfo } = useStoreWedding();
  const { clearCoupleInfo } = useStoreCouple();
  const { clearUserInfo, fetchUserInfo } = useStore();
  const { isLogin, isLoading } = useUser();

  useEffect(() => {
    clearWedInfo();
    clearUserInfo();
    clearCoupleInfo();
  }, []);

  const signOutAsync = async () => {
    await Auth.signOut();
    localStorage.clear();
    return;
  };

  useEffect(() => {
    signOutAsync();
  }, []);

  useEffect(() => {
    if (isLoading) {
      if (isLogin) {
        router.replace(ROOT_URL);
        return;
      }
      signOutAsync();
    }
  }, [isLogin]);

  const handleLogin = async (values: IAuthLoginForm): Promise<void> => {
    try {
      const { data, error } = await SignIn(values.email, values.password);
      if (error) {
        if (error.code === 'UserNotConfirmedException') {
          infoToast('Please verify using code in your email');
          router.push(EMAIL_VERIFICATION_URL);
          return;
        }
        if (error.code === 'UserNotFoundException' || error.code === 'NotAuthorizedException') {
          errorToast(ERROR_MESSAGES.INVALID_CREDENTIALS);
          return;
        }
        errorToast(ERROR_MESSAGES.INVALID_CREDENTIALS);
        return;
      }

      if (data) {
        if (data.challengeName === 'NEW_PASSWORD_REQUIRED') {
          localStorage.setItem(USER_EMAIL_KEY, values.email);
          router.replace(CHANGE_PASSWORD_URL);
          return;
        }

        const response = await userService.GetUserDetail();
        if (response && response.data && data.attributes) {
          const user = response.data.data;

          localStorage.setItem(USER_ID_KEY, user.id);
          localStorage.setItem(USER_SUBSCRIPTION_TYPE_KEY, user.subscrpition_type);
          localStorage.setItem(USER_VERSION_KEY, user.version);
          LogRocket.identify(user.id, {
            name: user.first_name,
            email: user.email,
            subscriptionType: 'pro',
          });

          if (
            user.version === USER_VERSIONS.V2 &&
            [...Subscription_check_list, SubscriptionType.FREEMIUM].includes(user.subscrpition_type)
          ) {
            router.replace(SALE_URL);
            return;
          }
          router.replace(ROOT_URL);
        }
        return;
      }
    } catch (error) {
      console.log(error);
      errorToast(ERROR_MESSAGES.UNABLE_TO_LOGIN);
    }
  };

  const formik = useFormik<IAuthLoginForm>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleLogin,
    validationSchema: LOGIN_FORM_SCHEMA(),
  });

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <div className=" bg-ghost_white ">
      <HTMLHeader
        heading="Login - Wedding Day Timeline | Manage Your Wedding Planning"
        description="Log in to Wedding Day Timeline to access your personalized wedding planning tools."
      />

      <div className="flex justify-center items-center pt-5 mb-5">
        <Logo />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="hidden lg:flex items-center justify-center px-4">
          <Image src={'/images/login-pic.png'} width="650" height="600" alt="Login" />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="py-10 flex items-center justify-center">
            <div className=" bg-white flex justify-center rounded-lg w-11/12 px-5 sm:w-10/12 border border-gray-200 shadow-md pb-10 ">
              <div className="w-full sm:w-10/12 md:w-8/12 lg:w-9/12">
                <h5 className="mb-2 text-w_4xl xl:text-3xl font-semibold text-purple tracking-tight pb-8 pt-12">
                  Sign In
                </h5>
                <p className="text-w_sm xl:text-base text-gray-700 font-medium pb-2">Email</p>
                <div>
                  <InputField
                    value={formik.values.email}
                    helperText={formik.touched.email && formik.errors.email}
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    onChange={formik.handleChange}
                    id="email"
                    disabled={formik.isSubmitting}
                    placeholder="Email"
                  />
                </div>
                <p className="text-gray-700 text-w_sm xl:text-base font-medium pt-8 pb-2">Password</p>
                <div>
                  <InputField
                    value={formik.values.password}
                    helperText={formik.touched.password && formik.errors.password}
                    error={Boolean(formik.touched.password && formik.errors.password)}
                    onChange={formik.handleChange}
                    id="password"
                    placeholder="Password"
                    disabled={formik.isSubmitting}
                    type="password"
                  />
                </div>
                <div className="text-w_xs xl:text-sm font-normal text-secondary flex justify-end mt-3">
                  <Link href={FORGET_PASSWORD_URL}>Forget password?</Link>
                </div>
                <div id="btn-div" className="pt-12 pb-3 flex justify-center lg:justify-start btn-div">
                  {formik.isSubmitting ? (
                    <Box>
                      <CircularProgress sx={{ color: '#00D5D4' }} size={40} />
                    </Box>
                  ) : (
                    <Stack spacing={2} direction="row">
                      <Button
                        id="sign-in-btn"
                        className="sign-in-btn"
                        type="submit"
                        variant="contained"
                        sx={{
                          textTransform: 'none',
                          color: 'white',
                          backgroundColor: '#00D5D4 !important',
                          borderRadius: '20px',
                          padding: '0.5rem 2.5rem',
                          fontFamily: 'poppins',
                          fontSize: { xs: '12px', xl: '16px' },
                          fontWeight: 500,
                        }}
                      >
                        Sign In
                      </Button>
                    </Stack>
                  )}
                </div>
                <hr className="mt-12 w-20 h-[2px] bg-gray-200 border-0 rounded-full flex m-auto lg:mt-10 lg:ml-0"></hr>
                <p className="font-semibold text-w_xs xl:text-sm text-black pt-12 text-center lg:text-left">
                  Don’t have an account?
                  <Link href={NEW_ONBOARDING_URL}>
                    <span className="mx-2 cursor-pointer text-purple border-b-2 border-purple">Sign Up</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
