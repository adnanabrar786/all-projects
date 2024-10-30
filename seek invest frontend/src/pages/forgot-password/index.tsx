import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import("components/ui/layouts/AuthLayout"), {
  ssr: false,
});
const ForgotPassword = dynamic(
  () => import("components/ui/ForgotPassword/ForgotPassword"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <ForgotPassword />;
}

Page.getLayout = (page: JSX.Element) => (
  <AuthLayout heading="Forgot Password | SeekInvest">{page}</AuthLayout>
);
