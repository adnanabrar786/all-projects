import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import("components/ui/layouts/AuthLayout"), {
  ssr: false,
});

const VerifyEmail = dynamic(() => import("components/ui/auth/VerifyEmail"), {
  ssr: false,
});

export default function Page() {
  return <VerifyEmail />;
}

Page.getLayout = (page: JSX.Element) => (
  <AuthLayout heading="Verify email">{page}</AuthLayout>
);
