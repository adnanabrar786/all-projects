import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});

const ValuesDetails = dynamic(
  () =>
    import(
      "components/ui/clients/ClientDetails/Proposals/Details/ValuesDetails"
    ),
  {
    ssr: false,
  }
);

export default function Page() {
  return <ValuesDetails />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Client Proposal Compare Values | SeekInvest">
    {page}
  </AppLayout>
);
