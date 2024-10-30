import ForgetPassword from '@/components/ui/ForgetPassword/ForgetPassword';
import { WEBSITE_NAME } from '@/constants/locales';
import Head from 'next/head';

const index = () => {
  return (
    <>
      <Head>
        <title>{WEBSITE_NAME.NAME}</title>
      </Head>
      <ForgetPassword />
    </>
  );
};

export default index;
