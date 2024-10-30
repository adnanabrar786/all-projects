import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});
const NewFHA = dynamic(
  () => import("components/ui/assessments/NewFHA/NewFHA"),
  {
    ssr: false,
  }
);

interface Props {
  category: string;
}

export default function Page({ category }: Props) {
  return <NewFHA category={category} />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="New FHA | SeekInvest">{page}</AppLayout>
);
