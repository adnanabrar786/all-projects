import EmailVerification from '@/components/ui/EmailVerification';
import { WEBSITE_NAME } from '@/constants/locales';
import Head from 'next/head';

const index = () => {
  return (
    <>
      <Head>
        <title>{WEBSITE_NAME.NAME}</title>
      </Head>
      <EmailVerification />
    </>
  );
};

export default index;
