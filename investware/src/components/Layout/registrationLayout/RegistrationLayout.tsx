import { StyledRegistrationChildrenLayout, StyledRegistrationLayout } from '@/components/common/StyledCommons';
import { ReactNode } from 'react';
import Header from './Header';

interface Props {
  children: ReactNode;
}

const RegistrationLayout = ({ children }: Props) => {
  return (
    <StyledRegistrationLayout>
      <Header />
      <StyledRegistrationChildrenLayout>{children}</StyledRegistrationChildrenLayout>
    </StyledRegistrationLayout>
  );
};

export default RegistrationLayout;
