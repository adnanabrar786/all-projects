import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAccordionIcon = styled(Stack)(({ theme }) => ({
  position: 'relative',
  width: '2rem',
  height: '2rem',

  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  [theme.breakpoints.down('sm')]: {
    width: '1.7rem',
    height: '1.7rem',
  },
}));
