import CustomButton from '@/components/common/Button/CustomButton';
import Input from '@/components/common/Input/Input';
import CustomModal from '@/components/common/Modal/CustomModal';
import { StyledSignUpFormikError } from '@/components/common/StyledCommons';
import TextMd from '@/components/common/Text/TextMd';
import TextXs from '@/components/common/Text/TextXs';

import {
  StyledChangePasswordContainer,
  StyledChangePasswordInputContainer,
} from '@/components/ui/Profile/profileStyled';
import { CHANGE_PASSWORD_SCHEMA } from '@/config/validation';
import { CrossEye, Eye } from '@/constants/images.routes';
import { COMMON_MESSAGES, SHOW_PASSWORD } from '@/constants/locales';
import { TOAST_MESSAGES } from '@/constants/locales/toast_message';
import { toastError, toastSuccess } from '@/constants/toaster';
import useUserData from '@/hooks/useUserData';
import { IChangePassword } from '@/interfaces/IUser';
import { handleChangePassword } from '@/services/auth.service';
import { handleTogglePassword } from '@/utils/helperFunctions';
import { Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  showChangePasswordModal: boolean;
  setShowChangePasswordModal: (showChangePasswordModal: boolean) => void;
}

const ChangePasswordModal = ({ showChangePasswordModal, setShowChangePasswordModal }: Props) => {
  const [newPassword, setNewPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [oldPassword, setOldPassword] = useState(true);
  const { user } = useUserData();

  const handleClick = () => {
    if (formik.values.new_password === formik.values.confirm_password) {
      mutation.mutate();
    }
  };

  const formik = useFormik<IChangePassword>({
    initialValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
    validationSchema: CHANGE_PASSWORD_SCHEMA(),
    onSubmit: handleClick,
    enableReinitialize: true,
  });

  const mutation = useMutation({
    mutationFn: () => handleChangePassword(user, formik.values.old_password, formik.values.new_password),

    onSuccess: (data) => {
      if (data) {
        if (data.error) {
          toastError(TOAST_MESSAGES.SOMETHING_WENT_WRONG);
        } else {
          toastSuccess(TOAST_MESSAGES.PASSWORD_UPDATED);
          setShowChangePasswordModal(false);
          formik.resetForm();
        }
      }
    },
    onError: (error) => {
      if (error) {
        toastError(TOAST_MESSAGES.INTERNAL_SERVER_ERROR);
      }
    },
  });

  return (
    <CustomModal
      showModal={showChangePasswordModal}
      setShowModal={setShowChangePasswordModal}
      sx={{
        borderRadius: '0.5rem',
        width: '21.25rem',
        paddingBottom: '20px',
        height: 'auto',
      }}
    >
      <Stack component="form" onSubmit={formik.handleSubmit}>
        <StyledChangePasswordContainer>
          <Stack>
            <TextMd
              sx={{
                lineHeight: '1.5rem',
                letterSpacing: '0.00938rem',
                color: 'var(--text-black)',
                textAlign: 'center',
                fontSize: '1rem',
              }}
              text="Change Password"
            />
          </Stack>
          <StyledChangePasswordInputContainer>
            <Stack>
              <Input
                endAdornment={
                  <Stack
                    onClick={() => {
                      handleTogglePassword(setOldPassword, oldPassword);
                    }}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    {oldPassword ? (
                      <Image src={CrossEye} width={20} height={20} alt="pic" />
                    ) : (
                      <Image src={Eye} width={20} height={20} alt="pic" />
                    )}
                  </Stack>
                }
                label={COMMON_MESSAGES.OLD_PASSWORD}
                type={oldPassword ? SHOW_PASSWORD.PASSWORD : SHOW_PASSWORD.TEXT}
                name="old_password"
                value={formik.values.old_password}
                onChange={formik.handleChange}
              />

              {formik.errors.old_password && formik.touched.old_password && (
                <StyledSignUpFormikError>
                  <TextXs
                    sx={{
                      color: 'var(--red)',
                    }}
                    text={String(formik.errors.old_password)}
                  />
                </StyledSignUpFormikError>
              )}
            </Stack>

            <Stack>
              <Input
                endAdornment={
                  <Stack
                    onClick={() => {
                      handleTogglePassword(setNewPassword, newPassword);
                    }}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    {newPassword ? (
                      <Image src={CrossEye} width={20} height={20} alt="pic" />
                    ) : (
                      <Image src={Eye} width={20} height={20} alt="pic" />
                    )}
                  </Stack>
                }
                label={COMMON_MESSAGES.NEW_PASSWORD}
                type={newPassword ? SHOW_PASSWORD.PASSWORD : SHOW_PASSWORD.TEXT}
                name="new_password"
                value={formik.values.new_password}
                onChange={formik.handleChange}
              />
              {formik.errors.new_password && formik.touched.new_password && (
                <StyledSignUpFormikError>
                  <TextXs
                    sx={{
                      color: 'var(--red)',
                    }}
                    text={String(formik.errors.new_password)}
                  />
                </StyledSignUpFormikError>
              )}
            </Stack>

            <Stack>
              <Input
                endAdornment={
                  <Stack
                    onClick={() => {
                      handleTogglePassword(setConfirmPassword, confirmPassword);
                    }}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    {confirmPassword ? (
                      <Image src={CrossEye} width={20} height={20} alt="pic" />
                    ) : (
                      <Image src={Eye} width={20} height={20} alt="pic" />
                    )}
                  </Stack>
                }
                label={COMMON_MESSAGES.CONFIRM_PASSWORD}
                type={confirmPassword ? SHOW_PASSWORD.PASSWORD : SHOW_PASSWORD.TEXT}
                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
              />
              {formik.errors.confirm_password && formik.touched.confirm_password && (
                <StyledSignUpFormikError>
                  <TextXs
                    sx={{
                      color: 'var(--red)',
                    }}
                    text={String(formik.errors.confirm_password)}
                  />
                </StyledSignUpFormikError>
              )}
            </Stack>
          </StyledChangePasswordInputContainer>
          <Stack>
            <CustomButton
              loading={mutation.isPending}
              type="submit"
              text="change password"
              sx={{
                marginTop: '2.06rem',
                width: '100%',
              }}
            />
          </Stack>
        </StyledChangePasswordContainer>
      </Stack>
    </CustomModal>
  );
};

export default ChangePasswordModal;
