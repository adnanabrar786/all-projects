import { Grid } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AppLoader } from 'components/common/AppLoader';
import HTMLHeader from 'components/common/Head';
import Input from 'components/common/InputField';
import Logo from 'components/common/Logo';
import { USER_EMAIL_KEY } from 'constants/localStorage';
import { useFormik } from 'formik';
import { IChangePasswordForm } from 'interfaces/forms';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { LOGIN_URL } from 'routes';
import { WeddingService } from 'services/wedding.service';
import { SUCCESS_MESSAGES } from 'utils/enums/successMessages';
import { AppText } from 'utils/enums/text';
import { successToast } from 'utils/toast';
import { ChangePasswordValidation } from 'validators';

export default function Page() {
  const router = useRouter();
  const wedding = new WeddingService();
  const [isLoading, setIsLoading] = useState(false);

  const changePassword = useMutation(wedding.ChangePassword, {
    onSuccess: ({ data }) => {
      successToast(SUCCESS_MESSAGES.PASSWORD_RESETTED);
      router.push(LOGIN_URL);
      setIsLoading(false);
    },
    onError(error: any) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    },
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      new_password: '',
      confirm_password: '',
    },
    validationSchema: ChangePasswordValidation(),
    onSubmit: async (values: IChangePasswordForm) => {
      changePassword.mutate(changePasswordBody(values.password, values.new_password));
      setIsLoading(true);
    },
  });

  function changePasswordBody(temporaryPassword: string, password: string) {
    const email = localStorage.getItem(USER_EMAIL_KEY);
    const body = {
      data: {
        temporaryPassword,
        password,
        username: email,
      },
    };
    return body;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className=" bg-ghost_white">
        <HTMLHeader heading="Reset Password" />
        <div className="flex justify-center items-center pt-5 mb-5">
          <Logo />
        </div>
        <div className="flex justify-center items-center mt-24">
          <Grid
            container
            my={'2rem'}
            sx={{
              width: '400px',
            }}
          >
            <Grid item xs={12} md={12} px={'2rem'} mb={'1rem'}>
              <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.TEMPORARY_PASSWORD} *</span>
              <Input
                id="current_password"
                name="password"
                type="password"
                className="mt-2"
                value={formik.values.password}
                helperText={formik.touched.password && formik.errors.password}
                error={Boolean(formik.touched.password && formik.errors.password)}
                onChange={formik.handleChange}
                placeholder="Temporary Password"
              />
            </Grid>

            <Grid item xs={12} md={12} px={'2rem'} pb={'1rem'}>
              <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.NEW_PASSWORD} *</span>
              <Input
                id="new_password"
                name="new_password"
                type="password"
                className="mt-2"
                value={formik.values.new_password}
                helperText={formik.touched.new_password && formik.errors.new_password}
                error={Boolean(formik.touched.new_password && formik.errors.new_password)}
                onChange={formik.handleChange}
                placeholder="New Password"
              />
            </Grid>

            <Grid item xs={12} md={12} px={'2rem'} pb={'1rem'}>
              <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.CONFIRM_NEW_PASSWORD} *</span>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                className="mt-2"
                value={formik.values.confirm_password}
                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                error={Boolean(formik.touched.confirm_password && formik.errors.confirm_password)}
                onChange={formik.handleChange}
                placeholder="Confirm New Password"
              />
            </Grid>
            <Grid item xs={12} my={'1rem'}>
              <div
                id="change-password-btn-div"
                className="flex items-center justify-center mx-6 change-password-btn-div"
              >
                <button
                  type="submit"
                  id="change-password-btn"
                  className="text-w_sm xl:text-w_0xl cursor-pointer flex justify-center items-center bg-secondary text-white rounded-full px-8 py-2 change-password-btn w-[280px] h-[45px]"
                >
                  {isLoading ? (
                    <div style={{ height: '100%' }}>
                      <AppLoader
                        color="white"
                        size={25}
                        sx={{
                          height: '25px',
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <FiEdit className="text-w_base1 xl:text-w_2xl mr-2" />
                      {AppText.CHANGE_PASSWORD}
                    </>
                  )}
                </button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </form>
  );
}
