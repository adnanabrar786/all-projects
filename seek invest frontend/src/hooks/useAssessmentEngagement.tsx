import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CREATE_ENGAGEMENT_KEY } from "constants/react_query_keys";
import { CustomError, IAssessmentEngagement } from "interfaces/assessment";
import { useRouter } from "next/router";
import { getAssessmentEngagement } from "services/assessment.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";

const useAssessmentEngagement = (assessmentId: string) => {
  const token = getToken();
  const router = useRouter();

  const {
    data: assessmentEngagement,
    isLoading,
    error,
  }: UseQueryResult<
    { data: { data: IAssessmentEngagement } },
    CustomError
  > = useQuery({
    queryKey: [CREATE_ENGAGEMENT_KEY, assessmentId],
    queryFn: () => getAssessmentEngagement(assessmentId),
    enabled: token ? true : false,
  });

  handleErrorPage(error, router);

  return {
    assessmentEngagement: assessmentEngagement?.data
      ? assessmentEngagement?.data.data
      : null,
    isLoading,
  };
};

export default useAssessmentEngagement;
