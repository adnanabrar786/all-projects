import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButtonContainer = styled(Button)(({ theme }) => ({
  padding: '0.5rem 1rem',
  borderRadius: '0.25rem',
  fontSize: '0.8125rem',
  boxShadow:
    '0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)',
  border: '1px solid var(--sky-blue)',
  color: 'var(--white)',
  background: 'var(--sky-blue)',
  height: '2.5rem',

  ':hover': {
    color: 'var(--white)',
    background: 'var(--sky-blue)',
  },

  '&.Mui-disabled': {
    borderColor: 'var(--sky-blue)',
    background: 'var(--sky-blue)',
    color: 'var(--white)',
    opacity: '0.5',
  },
}));
