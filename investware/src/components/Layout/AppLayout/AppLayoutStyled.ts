import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppLayoutContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
}));

export const StyledAppLayoutSubContainer = styled(Stack)(({ theme }) => ({
  width: '17.4375rem',
  paddingTop: '3.12rem',
  justifyContent: 'space-between',
  borderRight: '1px solid var(--border-grey)',
  [theme.breakpoints.down('lg')]: {
    marginLeft: '2rem',
    display: 'none',
  },
}));

export const StyledAppLayoutHeaderContainer = styled(Stack)(({ theme }) => ({
  minHeight: '4rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0rem 1.5rem',
  borderBottom: '1px solid var(--grey-100)',
  display: 'none',
  [theme.breakpoints.down('lg')]: {
    display: 'flex',
    padding: '0rem 1rem',
  },
}));

export const StyledAppLayoutHeaderLogo = styled(Stack)(({ theme }) => ({
  position: 'relative',
  width: '8.875rem',
  height: '2rem',
}));

export const StyledAppLayoutHeaderHamburger = styled(Stack)(({ theme }) => ({
  position: 'relative',
  width: '1.5rem',
  height: '1.5rem',
}));

export const StyledAppLayoutTabsContainer = styled(Stack)(({ theme }) => ({
  gap: '1.13rem',
  marginTop: '1.88rem',
  marginLeft: '2.31rem',
}));

export const StyledAppLayoutTabsMenuContainer = styled(Stack)(({ theme }) => ({
  gap: '1.13rem',
  marginTop: '1.88rem',
  marginLeft: '3.25rem',

  [theme.breakpoints.down('md')]: {
    marginLeft: '1.5rem',
  },
}));

export const StyledSidebarLogo = styled(Stack)(({ theme }) => ({
  position: 'relative',
  width: '8.875rem',
  height: '2rem',
  marginLeft: '1.44rem',
}));

export const StyledSidebarBoxContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
}));

export const StyledSidebarBoxSubContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  gap: '0.5rem',
  justifyContent: 'space-between',
  borderTop: '1px solid var(--border-grey)',
  alignItems: 'center',
  padding: '1.5rem 1rem',
}));

export const StyledMenubarSubContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  gap: '0.5rem',
  alignItems: 'center',
}));

export const StyledMenubarSubMiniContainer = styled(Stack)(({ theme }) => ({
  borderBottom: '1px solid var(--border-grey)',
  padding: '1.38rem 2rem 1.6rem 3.25rem',
  [theme.breakpoints.down('md')]: {
    padding: '1.38rem 1rem 1.6rem 1rem',
  },
}));

export const StyledLogOutBoxContainer = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  right: '-28.2rem',
  zIndex: '1000',
  bottom: '10px',
  marginBottom: '2rem',
  width: '27.75rem',
  borderRadius: '0.25rem',
  backgroundColor: 'var(--white)',
  boxShadow: ' 0px 4px 50px 0px rgba(0, 0, 0, 0.10)',
  border: '1px solid rgba(0, 0, 0, 0.12)',
}));

export const StyledLogOutBoxSubContainer = styled(Stack)(({ theme }) => ({
  padding: '1rem 1rem 0.3rem 1rem',
  borderRadius: '0.25rem',
}));

export const StyledLogOutBoxTextBox = styled(Stack)(({ theme }) => ({
  border: '1px dotted rgba(0, 0, 0, 0.12)',
  borderRadius: '0.25rem',
  width: '100%',
  marginTop: '1rem',
  textAlign: 'center',
}));

export const StyledLogOutBoxButtonStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'flex-end',
  gap: '2rem',
  marginTop: '1.8rem',

  [theme.breakpoints.down('sm')]: {
    gap: '0.2rem',
  },
}));

export const StyledSidebarMenuBarHamburgerImg = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
}));

export const StyledSidebarMenuBarContainer = styled(Stack)(({ theme }) => ({
  position: 'fixed',
  top: '0px',
  bottom: '0',
  minHeight: '100vh',
  maxHeight: '120vh',
  width: '100%',
  transition: 'all 1s',
  zIndex: '100',
  backgroundColor: 'var(--white)',
  boxSizing: 'border-box',
  paddingBottom: '20px',
  overflow: 'scroll',
}));
