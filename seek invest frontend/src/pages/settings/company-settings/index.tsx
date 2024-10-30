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

const CompanySettings = dynamic(
  () => import("components/ui/settings/CompanySettings/CompanySettings"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <CompanySettings />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Company Settings | SeekInvest">
    <SettingsLayout>{page}</SettingsLayout>
  </AppLayout>
);
