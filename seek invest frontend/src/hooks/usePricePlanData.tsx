import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PRICE_PLAN_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IBilling } from "interfaces/user";
import { useRouter } from "next/router";
import { allStripeProducts } from "services/user.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const usePricePlanData = () => {
  const token = getToken();
  const router = useRouter();

  const {
    data: pricePlan,
    error,
  }: UseQueryResult<{ data: { data: IBilling } }, CustomError> = useQuery({
    queryKey: [PRICE_PLAN_KEY],
    queryFn: () => allStripeProducts(),
    enabled: token ? true : false,
  });

  handleErrorPage(error, router);

  return { pricePlan: pricePlan?.data.data };
};

export default usePricePlanData;
