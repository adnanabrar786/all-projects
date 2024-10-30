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

const UserManagement = dynamic(
  () => import("components/ui/settings/UserManagement/UserManagement"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <UserManagement />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="User management | SeekInvest">
    <SettingsLayout>{page}</SettingsLayout>
  </AppLayout>
);
