import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { SINGLE_MODEL_DATA_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { IModel } from "interfaces/model";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { getSingleModel } from "services/model.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useSingleModelData = (isNewModel: boolean) => {
  const { modelId }: { modelId: string } = useParams();
  const token = getToken();
  const router = useRouter();

  const {
    data: singleModel,
    isLoading,
    isFetching,
    refetch,
    error,
  }: UseQueryResult<{ data: { data: IModel } }, CustomError> = useQuery({
    queryKey: [SINGLE_MODEL_DATA_KEY, modelId],
    queryFn: () => getSingleModel(modelId),
    enabled: token && !isNewModel ? true : false,
    refetchOnMount: true,
    retry: 0,
  });

  handleErrorPage(error, router);

  return {
    singleModel: singleModel?.data ? singleModel?.data.data : null,
    isLoading,
    isFetching,
    refetch,
  };
};

export default useSingleModelData;
