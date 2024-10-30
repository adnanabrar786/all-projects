import dynamic from "next/dynamic";
import Head from "next/head";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});
const ValuesProfile = dynamic(
  () => import("components/ui/clients/ClientDetails/Proposals/ValuesProfile"),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <Head>
        <title>{`Client Details | SeekInvest`}</title>
      </Head>

      <ValuesProfile />
    </>
  );
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Client Proposal Value Profile | SeekInvest">
    {page}
  </AppLayout>
);
