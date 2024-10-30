import Image from 'next/image';
import { LOGIN_URL, ROOT_URL } from 'routes';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Link from 'components/common/Link';
import Logo from 'components/common/Logo';
import InputField from 'components/common/InputField';
import { FORGET_PASSWORD_FORM_SCHEMA } from 'validators';
import { IAuthForgetPasswordForm } from 'interfaces/forms';
import { RequestForgotPasswordCode } from 'services/auth.service';
import { AppLoader } from 'components/common/AppLoader';
import useUser from 'hooks/useUser';
import { useEffect } from 'react';
import HTMLHeader from 'components/common/Head';
import { SUCCESS_MESSAGES } from 'utils/enums/successMessages';
import { successToast } from 'utils/toast';
import { USER_EMAIL_KEY } from 'constants/localStorage';

export default function Page() {
  const router = useRouter();
  const { isLogin, isLoading } = useUser();
  useEffect(() => {
    if (isLogin) {
      router.push(ROOT_URL);
    }
  }, [isLogin]);

  const handleSubmit = async (values: IAuthForgetPasswordForm) => {
    try {
      const { data } = await RequestForgotPasswordCode(values.email);
      if (data) {
        localStorage.setItem(USER_EMAIL_KEY, values.email);
        router.replace(LOGIN_URL);
      }
    } finally {
      successToast(SUCCESS_MESSAGES.VERIFICATION_CODE);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: handleSubmit,
    validationSchema: FORGET_PASSWORD_FORM_SCHEMA(),
  });
  if (isLoading) {
    return <AppLoader />;
  }
  return (
    <div className=" bg-ghost_white">
      <HTMLHeader heading="Forget Password" />
      <div className="flex justify-center items-center pt-5 mb-5">
        <Logo />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="hidden lg:flex items-center justify-center px-4">
          <Image src={'/images/forget-password-pic.png'} width="650" height="600" alt="ForgetPassword" />
        </div>

        <div className="py-10 flex items-center justify-center">
          <div className=" bg-white flex justify-center rounded-lg w-11/12 px-5 sm:w-10/12 border border-gray-200 shadow-md pb-10 ">
            <div className="w-full sm:w-10/12 md:w-8/12 lg:w-9/12">
              <h5 className="mb-2 text-w_4xl xl:text-3xl font-semibold text-purple tracking-tight pb-2 pt-12">
                Forgot your password?
              </h5>
              <p className="pb-8 text-purple text-w_sm xl:text-sm font-normal">
                We’ll send you an email with a link to reset your password
              </p>
              <p className=" text-gray-700 text-w_sm xl:text-base font-medium pb-2">Email</p>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <InputField
                    value={formik.values.email}
                    helperText={formik.touched.email && formik.errors.email}
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    onChange={formik.handleChange}
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 mt-16 mb-28">
                  <div className="col-span-12 lg:col-span-7 flex justify-center">
                    <Button
                      type="submit"
                      variant="contained"
                      id="reset-link-btn"
                      className="reset-link-btn"
                      style={{
                        color: 'white',
                        backgroundColor: '#00D5D4',
                        borderRadius: '20px',
                        fontFamily: 'poppins',
                        padding: '0.5rem 1.1rem',
                        fontWeight: 500,
                      }}
                      sx={{
                        textTransform: 'none',
                        fontSize: { xs: '12px', xl: '16px' },
                      }}
                    >
                      Send me a reset link
                    </Button>
                  </div>
                  <div className="col-span-12 lg:col-span-3 flex justify-center items-center">
                    <div className="text-sm text-secondary ">
                      <Link href={LOGIN_URL}>
                        <span className="cursor-pointer text-w_sm xl:text-base font-medium"> Go back </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
