import CustomButton from '@/components/common/Button/CustomButton';
import Input from '@/components/common/Input/Input';
import { StyledSignUpFormikError } from '@/components/common/StyledCommons';
import TextXs from '@/components/common/Text/TextXs';
import {
  StyledFormContainer,
  StyledHalfInput,
  StyledInputContainer,
  StyledSignUpFormSubContainer,
  StyledSignUpFormSubMiniContainer,
  StyledSignUpText,
  StyledTerms,
  StyledTwoInput,
} from '@/components/ui/signUp/signUpStyled';
import { SIGN_UP_FORM_SCHEMA } from '@/config/validation';
import { Check, CrossEye, Eye, UnCheck } from '@/constants/images.routes';
import { COMMON_MESSAGES, SHOW_PASSWORD, SIGNUP_PAGE_MESSAGES } from '@/constants/locales';
import { TOAST_MESSAGES } from '@/constants/locales/toast_message';
import { EMAIL_VERIFICATION } from '@/constants/routes/pages.routes';
import { toastError, toastSuccess } from '@/constants/toaster';
import { handleSignUp } from '@/services/auth.service';
import { handleTogglePassword } from '@/utils/helperFunctions';
import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const handleCheckboxChange = () => {
    setCheckbox(!checkbox);
  };

  const handleClick = () => {
    if (checkbox) {
      if (!mutation.isPending) {
        mutation.mutate();
        localStorage.setItem('signUp_email', formik.values.email);
      }
    } else {
      toastError(TOAST_MESSAGES.AGREE_PRIVACY_POLICY);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: String(),
      last_name: String(),
      company_name: String(),
      email: String(),
      password: String(),
      confirm_password: String(),
    },
    validationSchema: SIGN_UP_FORM_SCHEMA(),
    onSubmit: handleClick,
    enableReinitialize: true,
  });

  const mutation = useMutation({
    mutationFn: () =>
      handleSignUp(
        formik.values.email,
        formik.values.password,
        formik.values.first_name,
        formik.values.last_name,
        formik.values.company_name,
      ),

    onSuccess: (data) => {
      if (data) {
        if (data.error) {
          toastError(TOAST_MESSAGES.USER_ALREADY_EXIT);
        } else {
          toastSuccess(TOAST_MESSAGES.CREATED_SUCCESSFULLY_CHECK_YOUR_EMAIL);
          router.push(EMAIL_VERIFICATION);
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
    <StyledSignUpFormSubContainer>
      <Stack component="form" onSubmit={formik.handleSubmit}>
        <StyledSignUpFormSubMiniContainer>
          <StyledSignUpText>Sign up</StyledSignUpText>
          <StyledInputContainer>
            <StyledTwoInput>
              <StyledHalfInput>
                <Input
                  label={COMMON_MESSAGES.FIRST_NAME}
                  type="text"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                />

                {formik.errors.first_name && formik.touched.first_name && (
                  <StyledSignUpFormikError>
                    <TextXs
                      sx={{
                        color: 'var(--red)',
                      }}
                      text={String(formik.errors.first_name)}
                    />
                  </StyledSignUpFormikError>
                )}
              </StyledHalfInput>

              <StyledHalfInput>
                <Input
                  label={COMMON_MESSAGES.LAST_NAME}
                  type="text"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                />

                {formik.errors.last_name && formik.touched.last_name && (
                  <StyledSignUpFormikError>
                    <TextXs
                      sx={{
                        color: 'var(--red)',
                      }}
                      text={String(formik.errors.last_name)}
                    />
                  </StyledSignUpFormikError>
                )}
              </StyledHalfInput>
            </StyledTwoInput>
            <Stack>
              <Input
                label={COMMON_MESSAGES.COMPANY_NAME}
                type="text"
                name="company_name"
                value={formik.values.company_name}
                onChange={formik.handleChange}
              />
            </Stack>
            <Stack>
              <Input
                label={COMMON_MESSAGES.EMAIL_ADDRESS}
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <StyledSignUpFormikError>
                  <TextXs
                    sx={{
                      color: 'var(--red)',
                    }}
                    text={formik.errors.email}
                  />
                </StyledSignUpFormikError>
              )}
            </Stack>
            <StyledTwoInput>
              <StyledHalfInput>
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
              </StyledHalfInput>
              <StyledHalfInput>
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
              </StyledHalfInput>
            </StyledTwoInput>
          </StyledInputContainer>

          <StyledFormContainer>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkbox}
                  onChange={handleCheckboxChange}
                  icon={<Image priority src={UnCheck} alt={'icon'} width={24} height={24} />}
                  checkedIcon={<Image priority src={Check} alt={'icon'} width={24} height={24} />}
                  sx={{
                    padding: '0rem',
                  }}
                />
              }
              label={
                <StyledTerms>
                  {SIGNUP_PAGE_MESSAGES.ACCEPT} <span>{SIGNUP_PAGE_MESSAGES.TERMS_CONDITION}</span>
                </StyledTerms>
              }
            />
          </StyledFormContainer>

          <CustomButton
            type="submit"
            loading={mutation.isPending}
            text="Sign Up"
            sx={{
              marginTop: '2.06rem',
              backgroundColor: 'var(--sky-blue)',
            }}
          />
        </StyledSignUpFormSubMiniContainer>
      </Stack>
    </StyledSignUpFormSubContainer>
  );
};

export default SignUpForm;
