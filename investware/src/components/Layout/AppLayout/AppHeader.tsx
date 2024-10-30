import {
  StyledAppLayoutHeaderContainer,
  StyledAppLayoutHeaderHamburger,
  StyledAppLayoutHeaderLogo,
} from '@/components/Layout/AppLayout/AppLayoutStyled';
import { hamburger, Logo } from '@/constants/images.routes';
import Image from 'next/image';

interface Props {
  showMenubar: boolean;
  setShowMenubar: (showMenubar: boolean) => void;
}

const AppHeader = ({ showMenubar, setShowMenubar }: Props) => {
  return (
    <StyledAppLayoutHeaderContainer direction={'row'}>
      <StyledAppLayoutHeaderLogo>
        <Image priority src={Logo} alt={'icon'} fill />
      </StyledAppLayoutHeaderLogo>
      <StyledAppLayoutHeaderHamburger onClick={() => setShowMenubar(!showMenubar)}>
        <Image priority src={hamburger} alt={'icon'} fill />
      </StyledAppLayoutHeaderHamburger>
    </StyledAppLayoutHeaderContainer>
  );
};

export default AppHeader;
