import { Stack } from '@mui/material';
import dynamic from 'next/dynamic';

const Sale = dynamic(() => import('components/pages/Sale'), { ssr: false });

const Page = () => {
  return (
    <Stack
      sx={{
        backgroundColor: 'var(--white)',
      }}
    >
      <Sale />
    </Stack>
  );
};

export default Page;
