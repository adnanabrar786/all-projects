import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});
const ProposalRiskProfile = dynamic(
  () =>
    import("components/ui/clients/ClientDetails/Proposals/ProposalRiskProfile"),
  { ssr: false }
);

export default function Page() {
  return <ProposalRiskProfile />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Client Proposal Risk Profile | SeekInvest">
    {page}
  </AppLayout>
);
