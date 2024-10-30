import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { MODEL_PORTFOLIOS_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IModel } from "interfaces/model";
import { useRouter } from "next/router";
import { getAllModel } from "services/model.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useModelsData = (page: number) => {
  const router = useRouter();
  const token = getToken();
  const {
    data: models,
    isLoading,
    error,
  }: UseQueryResult<
    {
      data: {
        data: IModel[];
        meta: {
          total_pages: number;
          total_items: number;
          current_page: number;
          items_per_page: number;
        };
      };
    },
    CustomError
  > = useQuery({
    queryKey: [MODEL_PORTFOLIOS_KEY, page],
    queryFn: () => getAllModel(page),
    enabled: token ? true : false,
  });

  handleErrorPage(error, router);

  return {
    models: models?.data ? models?.data.data : null,
    isLoading,
    total_pages: models?.data ? models?.data.meta.total_pages : 1,
    total_items: models?.data ? models?.data.meta.total_items : 1,
    current_page: models?.data ? models?.data.meta.current_page : 1,
    items_per_page: models?.data ? models?.data.meta.items_per_page : 1,
  };
};

export default useModelsData;
