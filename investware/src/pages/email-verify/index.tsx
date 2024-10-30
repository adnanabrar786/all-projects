import RegistrationLayout from '@/components/Layout/registrationLayout/RegistrationLayout';
import EmailVerify from '@/components/ui/EmailVerify';
import { WEBSITE_NAME } from '@/constants/locales';
import Head from 'next/head';

const index = () => {
  return (
    <>
      <Head>
        <title>{WEBSITE_NAME.NAME}</title>
      </Head>
      <RegistrationLayout>
        <EmailVerify />
      </RegistrationLayout>
    </>
  );
};

export default index;
