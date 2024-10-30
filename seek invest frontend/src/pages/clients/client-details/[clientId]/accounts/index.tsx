import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});
const ClientDetailsLayout = dynamic(
  () => import("components/ui/layouts/ClientDetailsLayout"),
  {
    ssr: false,
  }
);

const ClientAccounts = dynamic(
  () => import("components/ui/clients/ClientDetails/Accounts/Accounts.v2"),
  { ssr: false }
);

export default function Page() {
  return <ClientAccounts />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Client Accounts | SeekInvest">
    <ClientDetailsLayout>{page}</ClientDetailsLayout>
  </AppLayout>
);
