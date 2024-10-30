import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import("components/ui/layouts/AuthLayout"), {
  ssr: false,
});

const Login = dynamic(() => import("components/ui/auth/Login"), {
  ssr: false,
});

export default function Page() {
  return <Login />;
}

Page.getLayout = (page: JSX.Element) => (
  <AuthLayout heading="Login | SeekInvest">{page}</AuthLayout>
);
