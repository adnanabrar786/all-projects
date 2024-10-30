import SignUp from '@/components/ui/signUp/SignUp';
import { WEBSITE_NAME } from '@/constants/locales';
import Head from 'next/head';

const index = () => {
  return (
    <>
      <Head>
        <title>{WEBSITE_NAME.NAME}</title>
      </Head>
      <SignUp />
    </>
  );
};

export default index;
