import { Grid } from '@mui/material';
import Input from 'components/common/InputField';
import { useFormik } from 'formik';
import { IChangePasswordForm } from 'interfaces/forms';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { ChangePassword as ChangePasswordService } from 'services/auth.service';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { SUCCESS_MESSAGES } from 'utils/enums/successMessages';
import { AppText, ButtonText } from 'utils/enums/text';
import { errorToast, successToast } from 'utils/toast';
import { ChangePasswordValidation } from 'validators';

const ChangePassword = () => {
  const [editPassword, setEditPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
      new_password: '',
      confirm_password: '',
    },
    validationSchema: ChangePasswordValidation(),
    onSubmit: async (values: IChangePasswordForm) => {
      const { data, error } = await ChangePasswordService(formik.values.password, formik.values.new_password);
      if (data) {
        successToast(SUCCESS_MESSAGES.PASSWORD_RESETTED);
        setEditPassword(!editPassword);
        formik.resetForm();
      }
      if (error) {
        errorToast(ERROR_MESSAGES.INCORRECT_PASSWORD);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {!editPassword ? (
        <>
          <Grid container my={'2rem'}>
            <Grid item xs={12} md={5} px={'2rem'} mb={'1rem'}>
              <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.CURRENT_PASSWORD} *</span>
              <Input
                name="password"
                type="password"
                className="mt-2"
                disabled
                value={formik.values.password}
                helperText={formik.touched.password ? formik.errors.password : ''}
                error={Boolean(formik.touched.password && formik.errors.password)}
                onChange={formik.handleChange}
                placeholder="Current Password"
              />
            </Grid>

            <Grid item xs={12} md={5} px={'2rem'} pb={'1rem'}>
              <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.CHANGE_PASSWORD} *</span>
              <Input
                id="new_password"
                name="new_password"
                type="password"
                className="mt-2"
                disabled
                value={formik.values.new_password}
                helperText={formik.touched.new_password ? formik.errors.new_password : ''}
                error={Boolean(formik.touched.new_password && formik.errors.new_password)}
                onChange={formik.handleChange}
                placeholder="New Password"
              />
            </Grid>
            <Grid item xs={12} md={5}></Grid>

            <Grid item xs={12} md={5} px={'2rem'} pb={'1rem'}>
              <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.CONFIRM_NEW_PASSWORD} *</span>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                className="mt-2"
                value={formik.values.confirm_password}
                disabled
                helperText={formik.touched.confirm_password ? formik.errors.confirm_password : ''}
                error={Boolean(formik.touched.confirm_password && formik.errors.confirm_password)}
                onChange={formik.handleChange}
                placeholder="Confirm New Password"
              />
            </Grid>
            <Grid item xs={12} my={'1rem'}>
              <div
                id="change-password-btn-div"
                className="flex items-center justify-center md:justify-start mx-6 change-password-btn-div"
              >
                <button
                  id="change-password-btn"
                  onClick={() => {
                    setEditPassword(!editPassword);
                  }}
                  className="text-w_sm xl:text-w_0xl cursor-pointer flex justify-center items-center bg-secondary text-white rounded-full px-8 py-2 change-password-btn"
                >
                  <FiEdit className="text-w_base1 xl:text-w_2xl mr-2" />
                  {AppText.CHANGE_PASSWORD}
                </button>
              </div>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container my={'2rem'}>
            <Grid item xs={12} md={5} px={'2rem'} mb={'1rem'}>
              <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.CURRENT_PASSWORD} *</span>
              <Input
                name="password"
                type="password"
                className="mt-2"
                value={formik.values.password}
                helperText={formik.touched.password ? formik.errors.password : ''}
                error={Boolean(formik.touched.password && formik.errors.password)}
                onChange={formik.handleChange}
                placeholder="Current Password"
              />
            </Grid>
            <Grid item xs={12} md={5} px={'2rem'}>
              <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.NEW_PASSWORD} *</span>
              <Input
                name="new_password"
                type="password"
                className="mt-2"
                value={formik.values.new_password}
                helperText={formik.touched.new_password ? formik.errors.new_password : ''}
                error={Boolean(formik.touched.new_password && formik.errors.new_password)}
                onChange={formik.handleChange}
                placeholder="New Password"
              />
            </Grid>
            <Grid item xs={12} md={5}></Grid>
            <Grid item xs={12} md={5} px={'2rem'} pt={{ xs: '1rem', md: '0px' }}>
              <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.CONFIRM_NEW_PASSWORD} *</span>
              <Input
                name="confirm_password"
                type="password"
                className="mt-2"
                value={formik.values.confirm_password}
                helperText={formik.touched.confirm_password ? formik.errors.confirm_password : ''}
                error={Boolean(formik.touched.confirm_password && formik.errors.confirm_password)}
                onChange={formik.handleChange}
                placeholder="Confirm New Password"
              />
            </Grid>
          </Grid>
          <Grid container px={'1rem'} marginBottom={5}>
            <Grid item xs={12}>
              <div className="flex items-center justify-center md:justify-start gap-6 mx-6 mb-[6px] save-btn-div">
                <button
                  id="save-btn"
                  type="submit"
                  className="cursor-pointer flex justify-center items-center bg-secondary text-white rounded-full px-8 py-2 save-btn"
                >
                  {ButtonText.SAVE}
                </button>
                <button
                  id="cancel-btn"
                  onClick={() => {
                    //TODO: for future use
                    // formik.setFieldValue('password', '');
                    // formik.setFieldValue('new_password', '');
                    // formik.setFieldValue('confirm_password', '');
                    setEditPassword(!editPassword);
                    formik.resetForm();
                  }}
                  className="cursor-pointer flex justify-center items-center bg-white border border-secondary text-secondary rounded-full px-8 py-2 cancel-btn"
                >
                  {ButtonText.CANCEL}
                </button>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </form>
  );
};

export default ChangePassword;
