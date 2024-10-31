import Box from '@mui/material/Box';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Box
      sx={{
        display: { xl: 'flex', xs: 'initial' },
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: '1600px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
