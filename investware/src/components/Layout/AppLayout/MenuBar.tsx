import IconText from '@/components/common/Icontext/IconText';
import CustomModal from '@/components/common/Modal/CustomModal';
import {
  StyledAppLayoutTabsMenuContainer,
  StyledMenubarSubContainer,
  StyledMenubarSubMiniContainer,
  StyledSidebarMenuBarContainer,
} from '@/components/Layout/AppLayout/AppLayoutStyled';
import { crossIcon, MenubarLogout } from '@/constants/images.routes';
import { Stack } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import AppHeader from './AppHeader';
import ContentItems from './ContentItems';
import LogOutBox from './LogOutBox';
import LogOutContent from './LogOutContent';
interface Props {
  showMenubar: boolean;
  setShowMenubar: (showMenubar: boolean) => void;
}

const MenuBar = ({ showMenubar, setShowMenubar }: Props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <StyledSidebarMenuBarContainer
      sx={{
        transform: showMenubar ? 'translateX(0px)' : 'translateX(-100%)',
      }}
      direction={'column'}
    >
      <AppHeader showMenubar={showMenubar} setShowMenubar={setShowMenubar} />
      <StyledMenubarSubMiniContainer>
        <Stack
          onClick={() => setShowMenubar(false)}
          sx={{
            alignItems: 'flex-end',
          }}
        >
          <Image priority src={crossIcon} alt={'icon'} width={18} height={18} />
        </Stack>

        <Stack
          sx={{
            width: '13rem',
          }}
        >
          <StyledMenubarSubContainer direction={'row'}>
            <LogOutBox />
          </StyledMenubarSubContainer>
        </Stack>
      </StyledMenubarSubMiniContainer>
      <Stack>
        <StyledAppLayoutTabsMenuContainer>
          <ContentItems showMenubar={showMenubar} setShowMenubar={setShowMenubar} />
          <Stack
            onClick={() => {
              if (setShowModal) {
                setShowModal(true);
              }
            }}
          >
            <IconText
              text={'Logout'}
              icon={MenubarLogout}
              iconWidth={20}
              iconHeight={20}
              sxRow={{
                cursor: 'pointer',
              }}
            />
          </Stack>
        </StyledAppLayoutTabsMenuContainer>
      </Stack>

      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        sx={{
          zIndex: '1000',
          width: { md: '90%', xs: '100%' },
          borderRadius: '0.25rem',
          backgroundColor: 'var(--white)',
          boxShadow: ' 0px 4px 50px 0px rgba(0, 0, 0, 0.10)',
          border: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <LogOutContent setShowLogOut={setShowModal} />
      </CustomModal>
    </StyledSidebarMenuBarContainer>
  );
};

export default MenuBar;
