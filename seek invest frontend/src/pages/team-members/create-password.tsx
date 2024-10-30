import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import("components/ui/layouts/AuthLayout"), {
  ssr: false,
});

const CreatePassword = dynamic(
  () => import("components/ui/auth/CreatePassword"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <CreatePassword />;
}

Page.getLayout = (page: JSX.Element) => (
  <AuthLayout heading="Create Password | SeekInvest">{page}</AuthLayout>
);
