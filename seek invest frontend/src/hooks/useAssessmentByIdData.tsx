import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ASSESSMENT_BY_ID_KEY } from "constants/react_query_keys";
import { CustomError, IAssessmentOverview } from "interfaces/assessment";
import { useRouter } from "next/router";
import { getAssessmentsById } from "services/assessment.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useAssessmentByIdData = (assessmentId: string) => {
  const token = getToken();
  const router = useRouter();

  const {
    data: assessmentData,
    error,
  }: UseQueryResult<{ data: { data: IAssessmentOverview } }, CustomError> =
    useQuery({
      queryKey: [ASSESSMENT_BY_ID_KEY, assessmentId],
      queryFn: () => getAssessmentsById(assessmentId),
      enabled: token ? true : false,
      retry: 0,
    });

  handleErrorPage(error, router);

  return {
    assessment: assessmentData?.data ? assessmentData?.data.data : null,
  };
};

export default useAssessmentByIdData;
