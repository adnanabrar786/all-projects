import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});
const Home = dynamic(() => import("components/ui/Home/Home"), {
  ssr: false,
});

export default function Page() {
  return <Home />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Home | SeekInvest">{page}</AppLayout>
);
