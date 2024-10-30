import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledResultContainer = styled(Stack)(({ theme }) => ({
  border: '1px solid #E0E0E0',
  marginTop: '2rem',
  padding: '1.25rem 1rem',
  borderRadius: '0.25rem',
  minHeight: '15rem',
  [theme.breakpoints.down('sm')]: {
    minHeight: '8rem',
  },
}));

export const StyledResultSubContainer = styled(Stack)(({ theme }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const StyledResultDataContainer = styled(Stack)(({ theme }) => ({
  marginTop: '1.25rem',
  width: '100%',
  flexWrap: 'wrap',

  [theme.breakpoints.down('xl')]: {
    justifyContent: 'flex-start',
  },
}));

export const StyledResultDataRowStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'var(--background-grey)',
}));

export const StyledResultDataTextStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  textAlign: 'center',
}));
