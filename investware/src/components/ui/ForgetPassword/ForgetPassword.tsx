import CustomButton from '@/components/common/Button/CustomButton';
import Input from '@/components/common/Input/Input';
import { StyledSignUpFormikError } from '@/components/common/StyledCommons';
import TextMd from '@/components/common/Text/TextMd';
import TextXL from '@/components/common/Text/TextXl';
import TextXs from '@/components/common/Text/TextXs';
import {
  StyledForgetPasswordContainer,
  StyledForgetPasswordSubContainer,
  StyledInputStack,
} from '@/components/ui/ForgetPassword/ForgetPasswordStyled';
import { FORGET_PASSWORD_SCHEMA } from '@/config/validation';
import { COMMON_MESSAGES, FORGET_PASSWORD_PAGE_MESSAGES } from '@/constants/locales';
import { TOAST_MESSAGES } from '@/constants/locales/toast_message';
import { LOGIN, RESET_PASSWORD } from '@/constants/routes/pages.routes';
import { toastError, toastSuccess } from '@/constants/toaster';
import { handlePasswordReset } from '@/services/auth.service';
import { Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RegistrationLayout from '../../Layout/registrationLayout/RegistrationLayout';

const ForgetPassword = () => {
  const router = useRouter();
  const handleClick = () => {
    mutation.mutate();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: FORGET_PASSWORD_SCHEMA(),
    onSubmit: handleClick,
    enableReinitialize: true,
  });

  const mutation = useMutation({
    mutationFn: () => handlePasswordReset(formik.values.email),
    onSuccess: (data) => {
      if (data !== undefined) {
        if (data.error) {
          toastError(TOAST_MESSAGES.SOMETHING_WENT_WRONG);
        } else {
          toastSuccess(TOAST_MESSAGES.CHECK_YOUR_EMAIL);
          localStorage.setItem('resetEmail', formik.values.email);
          router.push(RESET_PASSWORD);
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
              text="Reset Password"
              sx={{
                fontWeight: '400',
                lineHeight: '123.5%',
                letterSpacing: { md: '0.01563rem', xs: ' 0.00875rem;' },
                color: 'var(--text-black)',
                fontSize: { md: '2.125rem', xs: '1.25rem' },
              }}
            />

            <TextMd
              text={FORGET_PASSWORD_PAGE_MESSAGES.NO_WORRIES_WILL_SEND_YOU_RESET_INSTRUCTION}
              sx={{
                marginTop: { md: '1rem', xs: '0.5rem' },
                fontWeight: '500',
                lineHeight: ' 160%;',
                letterSpacing: '0.00938rem',
                color: 'var(--text-grey)',
                fontSize: { md: '1.25rem', xs: '0.875rem' },
              }}
            />

            <StyledInputStack>
              <Input
                label={COMMON_MESSAGES.EMAIL_ADDRESS}
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                sx={{
                  marginTop: { md: '1.5rem', xs: '2rem' },
                }}
              />
              {formik.errors.email && formik.touched.email && (
                <StyledSignUpFormikError>
                  <TextXs
                    sx={{
                      color: 'var(--red)',
                    }}
                    text={String(formik.errors.email)}
                  />
                </StyledSignUpFormikError>
              )}

              <CustomButton
                loading={mutation.isPending}
                type="submit"
                text={COMMON_MESSAGES.SEND}
                sx={{
                  marginTop: { md: '2rem', xs: '2rem' },
                  backgroundColor: 'var(--sky-blue)',
                  borderRadius: '0.25rem',
                  fontSize: '0.9375rem',
                  lineHeight: '1.625rem',
                }}
              />

              <Link href={LOGIN}>
                <TextMd
                  text="Back to Login"
                  sx={{
                    marginTop: '1.5rem',
                    fontWeight: { md: '500', xs: '400' },
                    lineHeight: { md: 's160%', xs: '143%' },
                    letterSpacing: { md: '0.00938rem', xs: '0.01063rem' },
                    color: 'var(--text-grey)',
                    textAlign: 'center',
                    fontSize: { md: '1.25rem', xs: '0.875rem' },
                  }}
                />
              </Link>
            </StyledInputStack>
          </StyledForgetPasswordSubContainer>
        </Stack>
      </StyledForgetPasswordContainer>
    </RegistrationLayout>
  );
};

export default ForgetPassword;
