import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});
const Proposal = dynamic(
  () => import("components/ui/clients/ClientDetails/Proposals/Proposal"),
  { ssr: false }
);

export default function Page() {
  return <Proposal />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Client Proposal | SeekInvest">{page}</AppLayout>
);
