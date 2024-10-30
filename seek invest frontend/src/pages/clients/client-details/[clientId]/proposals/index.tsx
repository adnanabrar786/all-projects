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
const Proposals = dynamic(
  () => import("components/ui/clients/ClientDetails/Proposals/Proposals"),
  { ssr: false }
);

export default function Page() {
  return <Proposals />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Client Proposals | SeekInvest">
    <ClientDetailsLayout>{page}</ClientDetailsLayout>
  </AppLayout>
);
