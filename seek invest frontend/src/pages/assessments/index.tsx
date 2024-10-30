import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});
const FHAs = dynamic(() => import("components/ui/assessments/FHAs/FHAsV2"), {
  ssr: false,
});

export default function Page() {
  return <FHAs />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="FHAs | SeekInvest">{page}</AppLayout>
);
