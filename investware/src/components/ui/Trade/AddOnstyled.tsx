import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAddOnListContainer = styled(Stack)(({ theme }) => ({
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  cursor: 'default',
  alignItems: 'center',
}));

export const StyledAddOnAccordionContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  paddingBottom: '1rem',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    paddingBottom: '0.5rem',
  },
}));

export const StyledAddOnListLeftButton = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  left: -20,
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

export const StyledAddOnListRightButton = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  right: -20,
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

export const StyledAddOnList = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
  flexShrink: 0,
  padding: '0.56rem 1rem',
}));
