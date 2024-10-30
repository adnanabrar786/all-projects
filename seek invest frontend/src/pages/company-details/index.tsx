import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import("components/ui/layouts/AuthLayout"), {
  ssr: false,
});

const CompanyDetails = dynamic(
  () => import("components/ui/onboardings/CompanyDetails/CompanyDetails"),
  { ssr: false }
);

export default function Page() {
  return <CompanyDetails />;
}

Page.getLayout = (page: JSX.Element) => (
  <AuthLayout heading="Company Details | SeekInvest">{page}</AuthLayout>
);
