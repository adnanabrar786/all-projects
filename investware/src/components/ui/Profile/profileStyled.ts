import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledProfileContainer = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  height: '100%',
  width: 'calc(100vw - 17.4375rem)',
  marginBottom: '2rem',
  [theme.breakpoints.down('lg')]: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '7.12rem',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '6.69rem',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '2.5rem',
  },
}));

export const StyledProfileSubContainer = styled(Stack)(({ theme }) => ({
  boxShadow: 'none',
  width: '40.25rem',
  marginLeft: '10rem',

  [theme.breakpoints.down('lg')]: {
    marginLeft: '0rem',
    width: '40.25rem',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const StyledProfileInputContainer = styled(Stack)(({ theme }) => ({
  marginTop: '2.25rem',
  gap: '1rem',
  padding: '0rem 1rem',
}));

export const StyledProfileSignUpText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontStyle: 'normal',
  letterSpacing: '-0.045rem',
  fontWeight: '400',
  lineHeight: '133.4%',
  color: 'var(--text-black)',
  textAlign: 'left',
  padding: '0rem 1rem',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));

export const StyledProfileButtonStack = styled(Stack)(({ theme }) => ({
  gap: '0.5rem',
  padding: '0rem 1rem',
}));

export const StyledChangePasswordContainer = styled(Stack)(({ theme }) => ({
  padding: '2rem 1.56rem 1.5rem 1.56rem',
}));

export const StyledChangePasswordInputContainer = styled(Stack)(({ theme }) => ({
  gap: '1rem',
  marginTop: '1.81rem',
}));
