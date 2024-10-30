import { Stack, SxProps } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  sx?: SxProps;
  onClick?: () => void;
}

const MenuCard = ({ children, sx, onClick }: Props) => {
  return (
    <Stack
      onClick={onClick}
      sx={{
        borderRadius: '0.25rem',
        border: '1px solid var(--gray-100)',
        background: '#fff',
        position: 'absolute',
        zIndex: '1',
        top: '30px',
        right: 0,
        overflow: 'hidden',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#BDBDBD',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#EEE',
        },
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};

export default MenuCard;
