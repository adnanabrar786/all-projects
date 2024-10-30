import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});
const CreateAssessment = dynamic(
  () => import("components/ui/assessments/CreateAssessment/CreateAssessment"),
  { ssr: false }
);

export default function Page() {
  return <CreateAssessment />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Create Assessment | SeekInvest">{page}</AppLayout>
);
