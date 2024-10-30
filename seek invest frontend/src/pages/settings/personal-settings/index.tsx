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

const PersonalSettings = dynamic(
  () => import("components/ui/settings/PersonalSettings/PersonalSettings"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <PersonalSettings />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Personal Settings | SeekInvest">
    <SettingsLayout>{page}</SettingsLayout>
  </AppLayout>
);
