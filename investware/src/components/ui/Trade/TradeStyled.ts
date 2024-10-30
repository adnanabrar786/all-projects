import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledSaveButtonContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'flex-end',
}));

export const StyledSaveButtonSubContainer = styled(Stack)(({ theme }) => ({
  border: '1px solid #E0E0E0',
  borderRadius: '0.25rem',
  padding: '0.5rem 0.75rem',
  gap: '0.44rem',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}));

export const StyledButtonTradeContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  marginTop: '2.06rem',
}));

export const StyledTradeDetailsContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  marginTop: '2rem',
  [theme.breakpoints.down('sm')]: {
    marginTop: '1.5rem',
  },
}));

export const TradeLayout = styled(Stack)(({ theme }) => ({
  height: '100%',
  marginTop: '6.06rem',
  width: 'calc(100vw - 17.4375rem)',
  marginBottom: '2rem',
  [theme.breakpoints.down('lg')]: {
    marginTop: '3rem',
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '1.5rem',
    width: '100%',
  },
}));
