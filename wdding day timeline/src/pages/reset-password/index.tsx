import { LOGIN_URL, ROOT_URL } from 'routes';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { GetServerSideProps } from 'next';
import Logo from 'components/common/Logo';
import InputField from 'components/common/InputField';
import { RESET_PASSWORD_FORM_SCHEMA } from 'validators';
import { IAuthResetPasswordForm } from 'interfaces/forms';
import { ResetPassword as ResetPasswordService } from 'services/auth.service';
import { AppLoader } from 'components/common/AppLoader';
import useUser from 'hooks/useUser';
import { useEffect } from 'react';
import HTMLHeader from 'components/common/Head';
import { errorToast, successToast } from 'utils/toast';
import { SUCCESS_MESSAGES } from 'utils/enums/successMessages';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { PageProps } from 'interfaces/pages';
import { USER_EMAIL_KEY } from 'constants/localStorage';

type Props = PageProps & {
  code: string;
};

export default function Page({ code, showToast }: Props) {
  const router = useRouter();
  const { isLogin, isLoading } = useUser();
  useEffect(() => {
    if (isLogin) {
      router.push(ROOT_URL);
    }
  }, [isLogin]);
  const handleSubmit = async (values: IAuthResetPasswordForm) => {
    const email = localStorage.getItem(USER_EMAIL_KEY)!;
    const { data, error } = await ResetPasswordService(email, values.code, values.password);
    if (data) {
      localStorage.clear();
      successToast(SUCCESS_MESSAGES.PASSWORD_CHANGED);
      return router.push(LOGIN_URL);
    }
    if (error) {
      errorToast(ERROR_MESSAGES.INVALID_CODE);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: code,
      password: '',
      confirm_password: '',
    },
    validationSchema: RESET_PASSWORD_FORM_SCHEMA(),
    onSubmit: handleSubmit,
  });
  if (isLoading) {
    return <AppLoader />;
  }
  return (
    <div className=" bg-ghost_white">
      <HTMLHeader heading="Reset Password" />
      <div className="flex justify-center items-center pt-5 mb-5">
        <Logo />
      </div>
      <div className="flex justify-center items-center mt-24">
        <div className=" bg-white flex justify-center rounded-lg mx-4 w-full sm:w-9/12 md:w-7/12 lg:w-5/12 border border-gray-200 shadow-md pb-10 ">
          <form onSubmit={formik.handleSubmit} className="w-full sm:w-9/12">
            <div className="px-4 w-full ">
              <h5 className="mb-2 text-2xl sm:text-3xl font-semibold text-purple tracking-tight pb-4 pt-12">
                Enter New Password
              </h5>
              <p className="text-gray-700 text-base font-medium pt-8 pb-2">Code</p>
              <div>
                <InputField
                  name="code"
                  value={formik.values.code}
                  helperText={formik.touched.code && formik.errors.code}
                  error={Boolean(formik.touched.code && formik.errors.code)}
                  onChange={formik.handleChange}
                  id="code"
                  placeholder="Code"
                />
              </div>
              <p className="text-gray-700 text-base font-medium pt-8 pb-2">Password</p>
              <div>
                <InputField
                  value={formik.values.password}
                  type="password"
                  helperText={formik.touched.password && formik.errors.password}
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  onChange={formik.handleChange}
                  id="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <p className="text-gray-700 text-base font-medium pt-8 pb-2">Confirm Password</p>
              <div>
                <InputField
                  value={formik.values.confirm_password}
                  type="password"
                  helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                  error={Boolean(formik.touched.confirm_password && formik.errors.confirm_password)}
                  onChange={formik.handleChange}
                  id="confirm_password"
                  placeholder="Confirm Password"
                  name="confirm_password"
                />
              </div>
              <div className="pt-12 pb-3 flex justify-center btn-div">
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    id="reset-btn"
                    className="reset-btn"
                    style={{
                      color: 'white',
                      backgroundColor: '#00D5D4',
                      borderRadius: '20px',
                      padding: '0.5rem 2rem',
                      fontFamily: 'poppins',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
                    sx={{ textTransform: 'none' }}
                    type="submit"
                  >
                    Reset Password
                  </Button>
                </Stack>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ code: string }> = async (context) => {
  const code = context.query.code;

  if (code && code.length > 5) {
    return {
      props: {
        code: `${code}`,
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: LOGIN_URL,
    },
  };
};
