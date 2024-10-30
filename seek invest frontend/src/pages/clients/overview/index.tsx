import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});

const Overview = dynamic(
  () => import("components/ui/clients/Overview/Overview.v2"),
  { ssr: false }
);

export default function Page() {
  return <Overview />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Clients | SeekInvest">{page}</AppLayout>
);
