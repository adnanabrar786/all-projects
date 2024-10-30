import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import("components/ui/layouts/AuthLayout"), {
  ssr: false,
});

const SignUp = dynamic(() => import("components/ui/auth/Signup"), {
  ssr: false,
});

export default function Page() {
  return <SignUp />;
}

Page.getLayout = (page: JSX.Element) => (
  <AuthLayout heading="Sign up | SeekInvest">{page}</AuthLayout>
);
