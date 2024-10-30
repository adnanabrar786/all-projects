import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { SINGLE_ASSESSMENT_KEY } from "constants/react_query_keys";
import { CustomError, IFinancialAssessment } from "interfaces/assessment";
import { useRouter } from "next/router";
import { getUnAuthAssessmentsById } from "services/assessment.services";
import { handleErrorPage } from "utils/error";
const useSingleAssessmentData = (assessmentId: string, clientId: string) => {
  const router = useRouter();

  const {
    data: assessment,
    error,
  }: UseQueryResult<{ data: { data: IFinancialAssessment } }, CustomError> =
    useQuery({
      queryKey: [SINGLE_ASSESSMENT_KEY],
      queryFn: () => getUnAuthAssessmentsById(assessmentId, clientId),
      refetchOnWindowFocus: false,
      enabled: assessmentId ? true : false,
    });

  handleErrorPage(error, router);

  return {
    assessment: assessment?.data ? assessment?.data.data : null,
  };
};

export default useSingleAssessmentData;
