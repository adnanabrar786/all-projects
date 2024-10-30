import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ASSESSMENT_FHAS_CATEGORY_KEY } from "constants/react_query_keys";
import { CustomError, IAssessmentFhasCategory } from "interfaces/assessment";
import { useRouter } from "next/router";
import { getAssessmentFhasCategory } from "services/assessment.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";

const useAssessmentFhasCategoryData = () => {
  const token = getToken();
  const router = useRouter();

  const {
    data: assessmentFhasCategory,
    error,
  }: UseQueryResult<
    { data: { data: IAssessmentFhasCategory[] } },
    CustomError
  > = useQuery({
    queryKey: [ASSESSMENT_FHAS_CATEGORY_KEY],
    queryFn: () => getAssessmentFhasCategory(),
    enabled: token ? true : false,
  });

  handleErrorPage(error, router);

  return {
    assessmentFhasCategory: assessmentFhasCategory?.data
      ? assessmentFhasCategory?.data.data
      : null,
  };
};

export default useAssessmentFhasCategoryData;
