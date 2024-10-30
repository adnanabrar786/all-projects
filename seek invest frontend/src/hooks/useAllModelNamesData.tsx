import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { MODEL_PORTFOLIOS_NAME_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IModel } from "interfaces/model";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getAllModelNames } from "services/model.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";

const useAllModelNamesData = () => {
  const { clientId } = useParams();
  const router = useRouter();

  const token = getToken();

  const {
    data: modelPortfolios,
    isLoading,
    error,
  }: UseQueryResult<
    { data: { data: Pick<IModel, "id" | "name">[] } },
    CustomError
  > = useQuery({
    queryKey: [MODEL_PORTFOLIOS_NAME_KEY, clientId],
    queryFn: () => getAllModelNames(),
    enabled: token && clientId ? true : false,
  });

  handleErrorPage(error, router);

  return {
    isLoading,
    modelPortfolios: modelPortfolios?.data ? modelPortfolios?.data.data : null,
  };
};

export default useAllModelNamesData;
