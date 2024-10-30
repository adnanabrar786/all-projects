import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import CustomButton from '@/components/common/Button/CustomButton';
import Input from '@/components/common/Input/Input';
import { StyledSignUpFormikError } from '@/components/common/StyledCommons';
import TextLg from '@/components/common/Text/TextLg';
import TextMd from '@/components/common/Text/TextMd';
import TextXs from '@/components/common/Text/TextXs';
import {
  StyledBottomLink,
  StyledFormControlBox,
  StyledInputBox,
  StyledLoginContainer,
  StyledLoginSubContainer,
} from '@/components/ui/Login/loginStyled';
import { LOG_IN_FORM_SCHEMA } from '@/config/validation';
import { Check, CrossEye, Eye, UnCheck } from '@/constants/images.routes';
import { COMMON_MESSAGES } from '@/constants/locales';
import { TOAST_MESSAGES } from '@/constants/locales/toast_message';
import { FORGET_PASSWORD, SIGN_UP, TRADE } from '@/constants/routes/pages.routes';
import { toastError, toastSuccess } from '@/constants/toaster';
import { useUserContext } from '@/context/user/UserContext';
import { handleSignIn } from '@/services/auth.service';
import { getUser } from '@/services/user.service';
import { handleTogglePassword } from '@/utils/helperFunctions';

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const { setUser } = useUserContext();

  useEffect(() => {
    const storedEmail = localStorage.getItem('LoginEmail');
    const storedPassword = localStorage.getItem('LoginPassword');
    if (storedEmail && storedPassword) {
      setCheckbox(true);
      formik.setFieldValue('email', storedEmail);
      formik.setFieldValue('password', storedPassword);
    }
  }, []);

  const handleCheckboxChange = () => {
    setCheckbox(!checkbox);
    if (!checkbox) {
      localStorage.setItem('LoginEmail', formik.values.email);
      localStorage.setItem('LoginPassword', formik.values.password);
    } else {
      localStorage.removeItem('LoginEmail');
      localStorage.removeItem('LoginPassword');
    }
  };

  const handleClick = () => {
    if (!mutation.isPending) {
      mutation.mutate();
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LOG_IN_FORM_SCHEMA(),
    onSubmit: handleClick,
    enableReinitialize: true,
  });

  const mutation = useMutation({
    mutationFn: () => handleSignIn(formik.values.email, formik.values.password),
    onSuccess: async (data) => {
      if (data !== undefined) {
        if (data.error) {
          toastError(TOAST_MESSAGES.SOMETHING_WENT_WRONG);
        } else {
          toastSuccess(TOAST_MESSAGES.SIGN_IN_SUCCESSFULLY);

          const user = await Auth.currentAuthenticatedUser();
          if (user && user.signInUserSession.accessToken.jwtToken) {
            localStorage.setItem('token', user.signInUserSession.accessToken.jwtToken);
          }
          const userData = await getUser();
          setUser(userData?.data?.data);

          router.replace(TRADE);
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
    <StyledLoginContainer>
      <Stack component="form" onSubmit={formik.handleSubmit}>
        <StyledLoginSubContainer>
          <TextLg
            sx={{
              fontWeight: '400',
              lineHeight: '133.4%',
              color: 'var(--text-black)',
              textAlign: { md: 'left', xs: 'center' },
            }}
            text="Log In"
          />

          <TextXs
            sx={{
              fontWeight: '400',
              lineHeight: '143%',
              textAlign: { md: 'left', xs: 'center' },
              fontSize: '0.875rem',
              letterSpacing: '0.01063rem',
              color: 'var(--text-grey-100)',
            }}
            text="Get started for free"
          />

          <StyledInputBox>
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
                  <TextXs sx={{ color: 'var(--red)' }} text={String(formik.errors.email)} />
                </StyledSignUpFormikError>
              )}
            </Stack>

            <Stack>
              <Input
                endAdornment={
                  <Stack onClick={() => handleTogglePassword(setShowPassword, showPassword)} sx={{ cursor: 'pointer' }}>
                    <Image src={showPassword ? CrossEye : Eye} width={20} height={20} alt="pic" />
                  </Stack>
                }
                label={COMMON_MESSAGES.PASSWORD}
                type={showPassword ? 'password' : 'text'}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <StyledSignUpFormikError>
                  <TextXs sx={{ color: 'var(--red)' }} text={String(formik.errors.password)} />
                </StyledSignUpFormikError>
              )}
            </Stack>
          </StyledInputBox>

          <StyledFormControlBox>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkbox}
                  onChange={handleCheckboxChange}
                  icon={<Image priority src={UnCheck} alt={'icon'} width={24} height={24} />}
                  checkedIcon={<Image priority src={Check} alt={'icon'} width={24} height={24} />}
                  sx={{ padding: '0rem' }}
                />
              }
              label={
                <TextMd
                  text={COMMON_MESSAGES.REMEMBER_ME}
                  sx={{
                    fontSize: '1rem',
                    fontWeight: '400',
                    lineHeight: '150%',
                    letterSpacing: '0.00938rem',
                    color: 'var(--text-black)',
                    marginLeft: '0.63rem',
                  }}
                />
              }
            />
          </StyledFormControlBox>

          <CustomButton
            type="submit"
            loading={mutation.isPending}
            text={COMMON_MESSAGES.SIGN_IN}
            sx={{
              marginTop: '2.06rem',
              backgroundColor: 'var(--sky-blue)',
              borderRadius: '0.25rem',
              fontSize: '0.9375rem',
            }}
          />

          <StyledBottomLink>
            <Link href={SIGN_UP}>
              <TextXs
                text="Create account"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  lineHeight: '143%',
                  letterSpacing: '0.01063rem',
                  color: 'var(--skyblue-100)',
                }}
              />
            </Link>

            <Link href={FORGET_PASSWORD}>
              <TextXs
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  lineHeight: '143%',
                  letterSpacing: '0.01063rem',
                  color: 'var(--skyblue-100)',
                }}
                text="Forgot password?"
              />
            </Link>
          </StyledBottomLink>
        </StyledLoginSubContainer>
      </Stack>
    </StyledLoginContainer>
  );
};

export default Login;
