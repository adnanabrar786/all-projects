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
const Assessments = dynamic(
  () => import("components/ui/clients/ClientDetails/Assessments/Assessments"),
  {
    ssr: false,
  }
);
const Page = () => {
  return <Assessments />;
};

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Client Assessments | SeekInvest">
    <ClientDetailsLayout>{page}</ClientDetailsLayout>
  </AppLayout>
);

export default Page;
