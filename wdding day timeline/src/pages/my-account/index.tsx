import { Box } from '@mui/material';
import Layout from 'components/ui/Layout';
import MyAccount from 'components/ui/Form/MyAccount';
import TopMyAccount from 'components/common/TopMyAccount';

export default function Page() {
  return (
    <div className="overflow-y-auto w-full  h-[85vh] mt-6">
      <Box sx={{ mx: { xs: '1rem', md: '2rem' } }}>
        <TopMyAccount />
      </Box>

      <Box sx={{ mx: { xs: '1rem', md: '2rem' } }}>
        <MyAccount />
      </Box>
    </div>
  );
}

Page.getLayout = (page: JSX.Element) => {
  return <Layout heading="My Account">{page}</Layout>;
};
