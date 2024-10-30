import CustomButton from '@/components/common/Button/CustomButton';
import Input from '@/components/common/Input/Input';
import { StyledSignUpFormikError } from '@/components/common/StyledCommons';
import TextMd from '@/components/common/Text/TextMd';
import TextXL from '@/components/common/Text/TextXl';
import TextXs from '@/components/common/Text/TextXs';
import {
  StyledResetInputStack,
  StyledResetPasswordContainer,
  StyledResetPasswordSubContainer,
  StyledResetWidthInputStack,
} from '@/components/ui/ResetPassword/resetPasswordStyled';
import { RESET_PASSWORD_SCHEMA } from '@/config/validation';
import { CrossEye, Eye } from '@/constants/images.routes';
import { COMMON_MESSAGES, SHOW_PASSWORD } from '@/constants/locales';
import { TOAST_MESSAGES } from '@/constants/locales/toast_message';
import { LOGIN } from '@/constants/routes/pages.routes';
import { toastError, toastSuccess } from '@/constants/toaster';
import { handleConfirmResetPassword, handlePasswordReset } from '@/services/auth.service';
import { handleTogglePassword } from '@/utils/helperFunctions';
import { Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RegistrationLayout from '../../Layout/registrationLayout/RegistrationLayout';

const ResetPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);

  const resendCode = () => {
    resendCodeMutation.mutate();
  };

  const resendCodeMutation = useMutation({
    mutationFn: () => {
      const resetEmail = localStorage.getItem('resetEmail') ?? '';
      return handlePasswordReset(resetEmail);
    },
    onSuccess: (data) => {
      if (data !== undefined) {
        if (data.error) {
          toastError(TOAST_MESSAGES.SOMETHING_WENT_WRONG);
        } else {
          toastSuccess(TOAST_MESSAGES.CODE_SENT_T0_EMAIL);
        }
      }
    },
    onError: (error) => {
      if (error) {
        toastError(TOAST_MESSAGES.INTERNAL_SERVER_ERROR);
      }
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  const formik = useFormik({
    initialValues: {
      otp: String(),
      password: String(),
      confirm_password: String(),
    },
    validationSchema: RESET_PASSWORD_SCHEMA(),
    onSubmit: handleClick,
    enableReinitialize: true,
  });

  const resetEmail =
    typeof localStorage !== 'undefined' && localStorage.getItem('resetEmail')
      ? localStorage.getItem('resetEmail')
      : String();

  const mutation = useMutation({
    mutationFn: () => handleConfirmResetPassword(resetEmail ?? String(), formik.values.otp, formik.values.password),

    onSuccess: (data) => {
      if (data !== undefined) {
        if (data.error) {
          toastError(TOAST_MESSAGES.SOMETHING_WENT_WRONG);
        } else {
          toastSuccess(TOAST_MESSAGES.YOUR_PASSWORD_UPDATED);
          router.push(LOGIN);
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
    <RegistrationLayout>
      <StyledResetPasswordContainer>
        <Stack component="form" onSubmit={formik.handleSubmit}>
          <StyledResetPasswordSubContainer>
            <TextXL
              text="Reset Password"
              sx={{
                fontWeight: '400',
                lineHeight: { md: '123.5%', xs: '1.25rem' },
                letterSpacing: { md: '0.01563rem', xs: ' 0.00875rem;' },
                color: 'var(--text-black)',
                fontSize: { md: '2.125rem', xs: '1.25rem' },
              }}
            />
            <StyledResetWidthInputStack>
              <StyledResetInputStack>
                <Stack>
                  <Input
                    label={COMMON_MESSAGES.CODE}
                    type="text"
                    sx={{
                      marginTop: { md: '1.5rem', xs: '2rem' },
                    }}
                    name="otp"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.otp && formik.touched.otp && (
                    <StyledSignUpFormikError>
                      <TextXs
                        sx={{
                          color: 'var(--red)',
                        }}
                        text={String(formik.errors.otp)}
                      />
                    </StyledSignUpFormikError>
                  )}
                </Stack>

                <Stack>
                  <Input
                    endAdornment={
                      <Stack
                        onClick={() => {
                          handleTogglePassword(setShowPassword, showPassword);
                        }}
                        sx={{
                          cursor: 'pointer',
                        }}
                      >
                        {showPassword ? (
                          <Image src={CrossEye} width={20} height={20} alt="pic" />
                        ) : (
                          <Image src={Eye} width={20} height={20} alt="pic" />
                        )}
                      </Stack>
                    }
                    label={COMMON_MESSAGES.PASSWORD}
                    type={showPassword ? SHOW_PASSWORD.PASSWORD : SHOW_PASSWORD.TEXT}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <StyledSignUpFormikError>
                      <TextXs
                        sx={{
                          color: 'var(--red)',
                        }}
                        text={String(formik.errors.password)}
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
              </StyledResetInputStack>

              <CustomButton
                type="submit"
                loading={mutation.isPending}
                text={COMMON_MESSAGES.SUBMIT}
                sx={{
                  marginTop: { md: '2rem', xs: '2rem' },
                  backgroundColor: 'var(--sky-blue)',
                  borderRadius: '0.25rem',
                  fontSize: '0.9375rem',
                  lineHeight: '1.625rem',
                }}
              />

              <TextMd
                onClick={resendCode}
                text="Resend Code"
                sx={{
                  marginTop: '1.5rem',
                  fontWeight: { md: '500', xs: '400' },
                  lineHeight: { md: '160%', xs: '143%' },
                  letterSpacing: { md: '0.00938rem', xs: '0.01063rem' },
                  color: 'var(--sky-blue)',
                  textAlign: 'center',
                  fontSize: { md: '1.25rem', xs: '0.875rem' },
                }}
              />
            </StyledResetWidthInputStack>
          </StyledResetPasswordSubContainer>
        </Stack>
      </StyledResetPasswordContainer>
    </RegistrationLayout>
  );
};

export default ResetPassword;
