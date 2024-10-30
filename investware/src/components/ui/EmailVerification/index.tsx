import CustomButton from '@/components/common/Button/CustomButton';
import Input from '@/components/common/Input/Input';
import { StyledSignUpFormikError } from '@/components/common/StyledCommons';
import TextMd from '@/components/common/Text/TextMd';
import TextXL from '@/components/common/Text/TextXl';
import TextXs from '@/components/common/Text/TextXs';
import RegistrationLayout from '@/components/Layout/registrationLayout/RegistrationLayout';
import {
  StyledForgetPasswordContainer,
  StyledForgetPasswordSubContainer,
  StyledInputStack,
} from '@/components/ui/ForgetPassword/ForgetPasswordStyled';
import { VERIFICATION_CODE_SCHEMA } from '@/config/validation';
import { COMMON_MESSAGES } from '@/constants/locales';
import { TOAST_MESSAGES } from '@/constants/locales/toast_message';
import { EMAIL_VERIFIED } from '@/constants/routes/pages.routes';
import { toastError, toastSuccess } from '@/constants/toaster';
import { handleConfirmSignUp, handlePasswordReset } from '@/services/auth.service';
import { Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

const EmailVerification = () => {
  let string = String();
  const router = useRouter();
  const handleClick = () => {
    mutation.mutate();
  };

  const formik = useFormik({
    initialValues: {
      veriyfy_code: string,
    },
    validationSchema: VERIFICATION_CODE_SCHEMA(),
    onSubmit: handleClick,
    enableReinitialize: true,
  });
  const mutation = useMutation({
    mutationFn: () => handleConfirmSignUp(localStorage.getItem('signUp_email') ?? '', formik.values.veriyfy_code),
    onSuccess: (data) => {
      if (data) {
        toastSuccess(TOAST_MESSAGES.CREATED_SUCCESSFULLY);
        router.push(EMAIL_VERIFIED);
        localStorage.removeItem('email');
      }
    },
    onError: (error) => {
      if (error) {
        toastError(TOAST_MESSAGES.INTERNAL_SERVER_ERROR);
      }
    },
  });

  const resendCode = () => {
    resendCodeMutation.mutate();
  };

  const resendCodeMutation = useMutation({
    mutationFn: () => {
      const resetEmail =
        typeof localStorage !== 'undefined' && localStorage.getItem('signUp_email')
          ? localStorage.getItem('signUp_email')
          : string;

      return handlePasswordReset(resetEmail ?? string);
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

  return (
    <RegistrationLayout>
      <StyledForgetPasswordContainer>
        <Stack component="form" onSubmit={formik.handleSubmit}>
          <StyledForgetPasswordSubContainer>
            <TextXL
              text="Verification code"
              sx={{
                fontWeight: '400',
                lineHeight: '123.5%',
                letterSpacing: { md: '0.01563rem', xs: ' 0.00875rem;' },
                color: 'var(--text-black)',
                fontSize: { md: '2.12rem', xs: '1.25rem' },
              }}
            />

            <StyledInputStack>
              <Input
                label={COMMON_MESSAGES.CODE}
                type="text"
                name="veriyfy_code"
                value={formik.values.veriyfy_code}
                onChange={formik.handleChange}
                error={formik.touched.veriyfy_code && Boolean(formik.errors.veriyfy_code)}
                sx={{
                  marginTop: { md: '1.5rem', xs: '2rem' },
                }}
              />

              {formik.errors.veriyfy_code && formik.touched.veriyfy_code && (
                <StyledSignUpFormikError>
                  <TextXs
                    sx={{
                      color: 'var(--red)',
                    }}
                    text={String(formik.errors.veriyfy_code)}
                  />
                </StyledSignUpFormikError>
              )}

              <CustomButton
                loading={mutation.isPending}
                type="submit"
                text={COMMON_MESSAGES.SUBMIT}
                sx={{
                  marginTop: '1rem',
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
            </StyledInputStack>
          </StyledForgetPasswordSubContainer>
        </Stack>
      </StyledForgetPasswordContainer>
    </RegistrationLayout>
  );
};

export default EmailVerification;
