import RegistrationLayout from '@/components/Layout/registrationLayout/RegistrationLayout';
import Login from '@/components/ui/Login/Login';
import { WEBSITE_NAME } from '@/constants/locales';
import Head from 'next/head';

const index = () => {
  return (
    <RegistrationLayout>
      <Head>
        <title>{WEBSITE_NAME.NAME}</title>
      </Head>
      <Login />
    </RegistrationLayout>
  );
};

export default index;
