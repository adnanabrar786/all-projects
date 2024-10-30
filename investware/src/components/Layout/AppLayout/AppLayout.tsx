import { AppLoader } from '@/components/common/AppLoader';
import {
  StyledAppLayoutContainer,
  StyledAppLayoutSubContainer,
  StyledAppLayoutTabsContainer,
  StyledLogOutBoxContainer,
  StyledSidebarBoxContainer,
  StyledSidebarBoxSubContainer,
  StyledSidebarLogo,
} from '@/components/Layout/AppLayout/AppLayoutStyled';
import { Logo } from '@/constants/images.routes';
import useUserData from '@/hooks/useUserData';
import { Stack } from '@mui/material';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import AppHeader from './AppHeader';
import ContentItems from './ContentItems';
import LogOutBox from './LogOutBox';
import LogOutContent from './LogOutContent';
import MenuBar from './MenuBar';

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const [showMenubar, setShowMenubar] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const { user } = useUserData();

  return (
    <StyledAppLayoutContainer direction={{ lg: 'row', xs: 'column' }}>
      <AppHeader showMenubar={showMenubar} setShowMenubar={setShowMenubar} />
      <StyledAppLayoutSubContainer>
        <Stack>
          <StyledSidebarLogo>
            <Image priority src={Logo} alt={'icon'} fill />
          </StyledSidebarLogo>
          <StyledAppLayoutTabsContainer>
            <ContentItems />
          </StyledAppLayoutTabsContainer>
        </Stack>
        <StyledSidebarBoxContainer direction={'row'}>
          <StyledSidebarBoxSubContainer direction={'row'}>
            {user ? (
              <>
                <LogOutBox logoutIcon={true} showLogOut={showLogOut} setShowLogOut={setShowLogOut} />
              </>
            ) : (
              <Stack
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '3rem',
                }}
              >
                <AppLoader color="var(--sky-blue)" />
              </Stack>
            )}
          </StyledSidebarBoxSubContainer>

          <StyledLogOutBoxContainer
            sx={{
              display: showLogOut ? 'flex' : 'none',
            }}
          >
            <LogOutContent setShowLogOut={setShowLogOut} />
          </StyledLogOutBoxContainer>
        </StyledSidebarBoxContainer>
      </StyledAppLayoutSubContainer>
      <Stack>{children}</Stack>
      <MenuBar showMenubar={showMenubar} setShowMenubar={setShowMenubar} />
    </StyledAppLayoutContainer>
  );
};

export default AppLayout;
