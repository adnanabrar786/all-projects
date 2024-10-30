import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import("components/ui/layouts/AuthLayout"), {
  ssr: false,
});

const PersonalDetails = dynamic(
  () => import("components/ui/onboardings/PersonalDetails"),
  { ssr: false }
);

export default function Page() {
  return <PersonalDetails />;
}

Page.getLayout = (page: JSX.Element) => (
  <AuthLayout heading="Personal Details | SeekInvest">{page}</AuthLayout>
);
