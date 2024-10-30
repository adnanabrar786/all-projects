import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DEFAULT_ASSESSMENT_KEY } from "constants/react_query_keys";
import { CustomError, IDefaultAssessment } from "interfaces/assessment";
import { useRouter } from "next/router";
import { getDefaultAssessment } from "services/assessment.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useDefaultAssessmentData = () => {
  const token = getToken();
  const router = useRouter();

  const {
    data: defaultAssessment,
    error,
  }: UseQueryResult<{ data: { data: IDefaultAssessment[] } }, CustomError> =
    useQuery({
      queryKey: [DEFAULT_ASSESSMENT_KEY],
      queryFn: () => getDefaultAssessment(),
      enabled: token ? true : false,
    });

  handleErrorPage(error, router);

  return {
    defaultAssessment: defaultAssessment?.data
      ? defaultAssessment?.data.data
      : null,
  };
};

export default useDefaultAssessmentData;
