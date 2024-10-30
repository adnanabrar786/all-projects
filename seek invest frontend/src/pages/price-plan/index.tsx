import usePricePlanData from "hooks/usePricePlanData";
import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import("components/ui/layouts/AuthLayout"), {
  ssr: false,
});
const PricingPlan = dynamic(
  () => import("components/ui/PricingPlan/PricingPlan"),
  {
    ssr: false,
  }
);

export default function Page() {
  const { pricePlan } = usePricePlanData();

  return <>{pricePlan && <PricingPlan stripeProducts={pricePlan} />}</>;
}

Page.getLayout = (page: JSX.Element) => (
  <AuthLayout heading="Pricing Plan | SeekInvest">{page}</AuthLayout>
);
