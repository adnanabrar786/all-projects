import TextXs from '@/components/common/Text/TextXs';
import { StyledSidebarMenuBarHamburgerImg } from '@/components/Layout/AppLayout/AppLayoutStyled';
import { LogoutIcon } from '@/constants/images.routes';
import useUserData from '@/hooks/useUserData';
import { ClickAwayListener, Stack } from '@mui/material';
import Image from 'next/image';
interface Props {
  logoutIcon?: boolean;
  showLogOut?: boolean;
  setShowLogOut?: (showLogOut: boolean) => void;
}

const LogOutBox = ({ logoutIcon, showLogOut, setShowLogOut }: Props) => {
  const { user } = useUserData();

  return (
    <>
      <Stack>
        <Stack
          sx={{
            width: '2.5rem',
            height: '2.5rem',
            backgroundColor: 'var(--skyblue-100)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextXs
            text={`${user?.first_name.charAt(0).toUpperCase()}${user?.last_name.charAt(0).toUpperCase()}`}
            sx={{
              color: 'var(--white)',
              letterSpacing: '0.07063rem',
            }}
          />
        </Stack>
      </Stack>
      <Stack>
        <TextXs
          sx={{
            color: 'var(--text-grey-300)',
            fontSize: '0.875rem',
            fontStyle: 600,
            lineHeight: '1.25rem',
            wordBreak: 'break-word',
            whiteSpace: 'pre-line',
          }}
          text={`${user?.first_name} ${user?.last_name}`}
        />
        <TextXs
          sx={{
            color: 'var(--text-grey-300)',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            wordBreak: 'break-word',
            whiteSpace: 'pre-line',
          }}
          text={`${user?.email}`}
        />
      </Stack>

      {logoutIcon && (
        <ClickAwayListener
          onClickAway={() => {
            if (setShowLogOut) {
              setShowLogOut(false);
            }
          }}
        >
          <StyledSidebarMenuBarHamburgerImg
            onClick={() => {
              if (setShowLogOut) {
                setShowLogOut(!showLogOut);
              }
            }}
          >
            <Image priority src={LogoutIcon} alt={'icon'} width={30} height={30} />
          </StyledSidebarMenuBarHamburgerImg>
        </ClickAwayListener>
      )}
    </>
  );
};

export default LogOutBox;
