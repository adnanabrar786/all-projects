import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});

const SettingsLayout = dynamic(
  () => import("components/ui/layouts/SettingsLayout"),
  {
    ssr: false,
  }
);

const PlansAndBillings = dynamic(
  () => import("components/ui/settings/PlansAndBillings/PlansAndBillings"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <PlansAndBillings />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Plans and Billings | SeekInvest">
    <SettingsLayout>{page}</SettingsLayout>
  </AppLayout>
);
