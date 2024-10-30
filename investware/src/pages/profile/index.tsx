import AppLayout from '@/components/Layout/AppLayout/AppLayout';
import Profile from '@/components/ui/Profile';
import { WEBSITE_NAME } from '@/constants/locales';
import Head from 'next/head';

const index = () => {
  return (
    <AppLayout>
      <Head>
        <title>{WEBSITE_NAME.NAME}</title>
      </Head>
      <Profile />
    </AppLayout>
  );
};

export default index;
