import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});
const ShareAssessment = dynamic(
  () => import("components/ui/ShareAssessment/ShareAssessment"),
  { ssr: false }
);

export default function Page() {
  return <ShareAssessment />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Share Assessment | SeekInvest">{page}</AppLayout>
);
