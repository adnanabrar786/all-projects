import AppLayout from '@/components/Layout/AppLayout/AppLayout';
import Trade from '@/components/ui/Trade';
import { WEBSITE_NAME } from '@/constants/locales';
import { ISecurityTypeBackendData } from '@/interfaces/securities';
import { getSecurityTypes } from '@/services/securities.services';
import Head from 'next/head';

export default function Page({ getSecurityTypeData }: { getSecurityTypeData: ISecurityTypeBackendData[] }) {
  return (
    <AppLayout>
      <Head>
        <title>{WEBSITE_NAME.NAME}</title>
      </Head>
      <Trade getSecurityTypeData={getSecurityTypeData} />
    </AppLayout>
  );
}

export async function getStaticProps() {
  const getAllSecurityTypeData = await getSecurityTypes();

  const getSecurityTypeData = getAllSecurityTypeData?.data ?? [];

  return {
    props: {
      getSecurityTypeData,
    },
  };
}
