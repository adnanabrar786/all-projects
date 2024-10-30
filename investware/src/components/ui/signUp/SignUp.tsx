import { StyledSignUpContainer } from '@/components/ui/signUp/signUpStyled';
import RegistrationLayout from '../../Layout/registrationLayout/RegistrationLayout';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  return (
    <RegistrationLayout>
      <StyledSignUpContainer sx={{ width: { md: 'auto', xs: '100%' } }}>
        <SignUpForm />
      </StyledSignUpContainer>
    </RegistrationLayout>
  );
};

export default SignUp;
