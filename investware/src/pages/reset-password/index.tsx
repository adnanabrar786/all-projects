import ResetPassword from '@/components/ui/ResetPassword/ResetPassword';
import { WEBSITE_NAME } from '@/constants/locales';
import Head from 'next/head';

const index = () => {
  return (
    <>
      <Head>
        <title>{WEBSITE_NAME.NAME}</title>
      </Head>
      <ResetPassword />
    </>
  );
};

export default index;
